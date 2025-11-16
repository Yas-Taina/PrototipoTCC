library(plumber)
library(ggplot2)
library(plotly)
library(htmlwidgets)
library(jsonlite)
library(dplyr)
library(lubridate)

# Conexão com o banco analítico
get_conn_analytics <- function() {
  dbConnect(
    RPostgres::Postgres(),
    dbname = Sys.getenv("ANALYTICS_DB_NAME", "prototipo_tcc_analytics_db"),
    host = Sys.getenv("ANALYTICS_DB_HOST", "localhost"),
    port = as.integer(Sys.getenv("ANALYTICS_DB_PORT", 5411)),
    user = Sys.getenv("ANALYTICS_DB_USER", "root"),
    password = Sys.getenv("ANALYTICS_DB_PASSWORD", "teste123")
  )
}

#' @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")

  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods", "*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
}

#* Health check
#* @get /health
function() {
  return(list(status = "API funcionando", timestamp = Sys.time()))
}

#* Processa dados e retorna gráfico
#* @get /gerar_grafico
#* @serializer html
function(res) {
  cat("Gerando gráfico a partir do banco analítico em:", Sys.time(), "\n")
  
  conn <- get_conn_analytics()
  
  tryCatch({
    # Consulta dados do banco analítico
    df <- dbGetQuery(conn, "
      SELECT created_date AS data, value_x AS valor_x, value_y AS valor_y
      FROM daily_data_points
    ")
    df$data <- as.Date(df$data)
    df$valor_x <- as.numeric(df$valor_x)
    df$valor_y <- as.numeric(df$valor_y)
    
    # Gráfico
    grafico <- ggplot(df, aes(x = data)) +
      geom_line(aes(y = valor_x, color = "Valor X"), linewidth = 1.2) +
      geom_line(aes(y = valor_y, color = "Valor Y"), linewidth = 1.2) +
      geom_point(aes(y = valor_x, color = "Valor X"), size = 2) +
      geom_point(aes(y = valor_y, color = "Valor Y"), size = 2) +
      scale_color_manual(values = c("Valor X" = "#1f77b4", "Valor Y" = "#ff7f0e"), name = "Variáveis") +
      labs(
        title = "Progressão dos Valores X e Y por Data",
        x = "Data",
        y = "Valor Total",
        caption = paste("Gerado em", format(Sys.time(), "%d/%m/%Y %H:%M"))
      ) +
      theme_minimal() +
      theme(
        plot.title = element_text(hjust = 0.5, face = "bold", size = 14),
        axis.text.x = element_text(angle = 45, hjust = 1),
        legend.position = "bottom",
        panel.grid.major = element_line(color = "grey80"),
        panel.grid.minor = element_blank()
      )
    
    grafico_interativo <- ggplotly(grafico)
    arquivo_temp <- tempfile(fileext = ".html")
    saveWidget(grafico_interativo, file = arquivo_temp, selfcontained = TRUE)
    html_str <- paste(readLines(arquivo_temp, warn = FALSE), collapse = "\n")
    unlink(arquivo_temp)
    
    return(html_str)
  },
  error = function(e) {
    cat("Erro:", conditionMessage(e), "\n")
    res$status <- 500
    return(list(error = paste("Erro no processamento:", e$message)))
  },
  finally = {
    dbDisconnect(conn)
  })
}

