# Lista e instala pacotes
pacotes <- c("plumber", "ggplot2", "plotly", "jsonlite", "dplyr", "lubridate", "htmlwidgets", "DBI", "RPostgres")
instalar <- pacotes[!(pacotes %in% installed.packages()[, "Package"])]
if(length(instalar)) install.packages(instalar, repos = "https://cloud.r-project.org")

lapply(pacotes, library, character.only = TRUE)

api <- plumb("plumber.R")

cat("Iniciando servidor Plumber na porta 8000...\n")
cat("Endpoints disponíveis:\n")
cat("- GET  /health\n")
cat("- GET  /gerar_grafico\n")
cat("Acesse: http://localhost:8000\n")

api$run(port = 8000, host = "0.0.0.0", swagger = TRUE)

#formato de dados esperado: 
#   {
#    "data": ["2025-02-25", "2025-02-25", "2025-02-26", "2025-02-26", "2025-02-27", "2025-02-28"],
#    "valor_x": [10, 20, 15, 25, 30, 35],
#    "valor_y": [5, 10, 8, 12, 15, 18]
#   }

#para testar no cmd do windows: 
#   curl -X POST http://localhost:8000/gerar_grafico -H "Content-Type: application/json" -d "{\"data\":[\"2025-02-25\",\"2025-02-25\",\"2025-02-26\"],\"valor_x\":[10,20,15],\"valor_y\":[5,10,8]}" --output grafico.png && if exist grafico.png start grafico.png