from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago
from airflow.hooks.base import BaseHook
import pandas as pd
from sqlalchemy import create_engine

default_args = {
    "owner": "yasmin",
    "start_date": days_ago(1)
}

def get_engine(conn_id: str):
    """
    Cria engine SQLAlchemy a partir de um conn_id do Airflow.
    """
    conn = BaseHook.get_connection(conn_id)
    return create_engine(
        f"postgresql://{conn.login}:teste123@{conn.host}:{conn.port}/{conn.schema}"
    )

def etl_daily(**kwargs):
    source_engine = get_engine("postgres_source")
    analytics_engine = get_engine("postgres_analytics")

    # Extrair
    df = pd.read_sql("SELECT * FROM data_points;", source_engine)

    # Transformar
    df["created_date"] = pd.to_datetime(df["date"]).dt.date

    daily_df = df.groupby(["created_date"])[["value_x", "value_y"]].sum().reset_index()

    # Carregar
    daily_df.to_sql(
        "daily_data_points",
        analytics_engine,
        if_exists="replace",
        index=False
    )

def etl_weekly(**kwargs):
    source_engine = get_engine("postgres_source")
    analytics_engine = get_engine("postgres_analytics")

    # Extrair
    df = pd.read_sql("SELECT * FROM data_points;", source_engine)

    # Transformar - agregação semanal
    df["created_week"] = pd.to_datetime(df["date"]).dt.to_period("W").apply(lambda r: r.start_time.date())
    weekly_df = df.groupby("created_week")[["value_x", "value_y"]].sum().reset_index()

    # Carregar
    weekly_df.to_sql(
        "weekly_data_points",
        analytics_engine,
        if_exists="replace",
        index=False
    )

with DAG(
    dag_id="prototipo_data_pipeline",
    default_args=default_args,
    schedule_interval=None,
    catchup=False
) as dag:

    daily_task = PythonOperator(
        task_id="etl_daily",
        python_callable=etl_daily,
        provide_context=True
    )

    weekly_task = PythonOperator(
        task_id="etl_weekly",
        python_callable=etl_weekly,
        provide_context=True
    )

    daily_task >> weekly_task
