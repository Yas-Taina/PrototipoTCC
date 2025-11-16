class AnalysisController < ApplicationController
  def execute
    plumber_url = ENV.fetch("PLUMBER_URL", "http://host.docker.internal:8000/gerar_grafico")

    response = HTTP.get(plumber_url)

    render html: response.body.to_s.html_safe, status: :ok
  rescue HTTP::Error => e
    render plain: "Request failed: #{e.message}", status: :bad_gateway
  end
end
