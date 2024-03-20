## Como rodar os projetos:

1. docker compose -f docker-compose.elk.yaml up -d --build
-> Esse comando vai subir os containers da stack ELK. Pode demorar um pouco.
-> Acesse localhost:5601 -> Explore on my own -> Discovery -> Create index pattern -> Name: logstash-* e timestamp field: @timestamp -> Create index pattern 
2. docker compose up -d --build para rodar a API juntamente com o mysql e o banco. 
OBS: por falta de tempo não consegui fazer o consumer e talvez algumas
implementações mal testadas e de ultima hora quebrem a aplicação o durante uma chamada via postman por exemplo.