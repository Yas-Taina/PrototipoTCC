# FROM rocker/r-ver:4.5.1

# WORKDIR /app

# COPY script_plumber.R plumber.R /app/

# RUN apt-get update && apt-get install -y \
#     libcurl4-openssl-dev \
#     libssl-dev \
#     libxml2-dev \
#     libfontconfig1-dev \
#     libfreetype6-dev \
#     libpng-dev \
#     libtiff5-dev \
#     libjpeg-dev \
#     && rm -rf /var/lib/apt/lists/*

# RUN R -e "install.packages(c('plumber', 'ggplot2', 'plotly', 'jsonlite', 'dplyr', 'lubridate', 'htmlwidgets'), repos='https://cloud.r-project.org')"

# EXPOSE 8000

# CMD ["Rscript", "script_plumber.R"]