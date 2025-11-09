# Protótipo Kherprix

## Tecnologias usadas
* Angular 17
* Ruby 3.4.7
* Rails 8.0.3
* R 4.5.1
* PostgreSQL 17

## Como executar

Ambos o frontend e backend foram configurados para utilizar o docker, podendo ser executados rodando ```docker-compose up```. OBS: A primeira execução pode levar alguns minutos.

Nesse momento api em R utilizando plumber precisa ser executada separadamente (será adicionada à configuração do docker futuramente). Para executar, seguir os seguintes passos:

1. Instalar a versão do R indicada nas tecnologias usadas;
2. Acessar a pasta ```"./Scripts R"```
3. Executar o comando ```$ RScript ./script_plumber.R```

### Lista de comandos:
```
docker-compose up -d
cd "./Scripts R"
RScript ./script_plumber.R
```

Quando todos os módulos estiverem rodando, eles podem ser acessados pelas seguintes rotas:

Frontend: ```localhost:4200```

Backend: ```localhost:3000```

Plumber: ```localhost:8000```

Banco: ```localhost:5432```
