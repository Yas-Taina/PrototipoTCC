library(plumber)
library(ggplot2)
library(plotly)
library(htmlwidgets)
library(jsonlite)
library(dplyr)
library(lubridate)

#' @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
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
#* @post /gerar_grafico
#* @serializer html
function(req, res) {
  
  cat("Recebendo requisição em:", Sys.time(), "\n")
  
  tryCatch({
    dados_json <- req$postBody
    cat("JSON recebido:", dados_json, "\n")
    
    dados <- fromJSON(dados_json)
    
    if (!all(c("data", "valor_x", "valor_y") %in% names(dados))) {
      res$status <- 400
      return(list(error = "JSON deve conter campos: data, valor_x, valor_y"))
    }
    
    df <- data.frame(
      data = as.Date(dados$data),
      valor_x = as.numeric(dados$valor_x),
      valor_y = as.numeric(dados$valor_y)
    )
    
    df_agrupado <- df %>%
      group_by(data) %>%
      summarise(
        total_x = sum(valor_x, na.rm = TRUE),
        total_y = sum(valor_y, na.rm = TRUE)
      ) %>%
      arrange(data)
    
    cat("Dados agrupados:\n")
    print(df_agrupado)
    
    grafico <- ggplot(df_agrupado, aes(x = data)) +
      geom_line(aes(y = total_x, color = "Valor X"), linewidth = 1.2) +
      geom_line(aes(y = total_y, color = "Valor Y"), linewidth = 1.2) +
      geom_point(aes(y = total_x, color = "Valor X"), size = 2) +
      geom_point(aes(y = total_y, color = "Valor Y"), size = 2) +
      scale_color_manual(
        values = c("Valor X" = "#1f77b4", "Valor Y" = "#ff7f0e"),
        name = "Variáveis"
      ) +
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
    
    # arquivo_temp <- tempfile(fileext = ".html")
    # ggsave(
    #   arquivo_temp, 
    #   plot = grafico, 
    #   device = "html", 
    #   width = 10, 
    #   height = 6, 
    #   dpi = 150
    # )

    #saveWidget(grafico_interativo, file = "my_interactive_plot.html", selfcontained = TRUE)
    arquivo_temp <- tempfile(fileext = ".html")
    saveWidget(grafico_interativo, file = arquivo_temp, selfcontained = TRUE)
    html_str <- paste(readLines(arquivo_temp, warn = FALSE), collapse = "\n")
    unlink(arquivo_temp)


    # imagem_bytes <- readBin(arquivo_temp, "raw", file.info(arquivo_temp)$size)
    
    # unlink(arquivo_temp)
    
    cat("Gráfico gerado com sucesso!\n")
    return(html_str)
    
  }, error = function(e) {
    cat("Erro:", toJSON(e), "\n")
    res$status <- 500
    return(list(error = paste("Erro no processamento:", e$message)))
  })
}

