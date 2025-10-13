class AnalysisController < ApplicationController
  def execute
    points = DataPoint.all

    response = HTTP.post(
      "http://localhost:8000/gerar_grafico",
      :json => {
        :data => points.map { |point| point.date },
        :valor_x => points.map { |point| point.valueX },
        :valor_y => points.map { |point| point.valueY },
      }
    )

    render html: response.body.to_s.html_safe, status: :ok
  rescue HTTP::Error => e
    render plain: "Request failed: #{e.message}", status: :bad_gateway
  end
end
