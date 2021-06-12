## Panda

### Установка приложения

### SSL

Dev:

В `/etc/hosts` добавить `127.0.0.1 localhost ${HOST_NAME}`.

    openssl req -config .conf -new -sha256 -newkey rsa:2048 -nodes\
        -keyout privkey.pem -x509 -days 365\
        -out fullchain.pem -subj '/CN=localhost'

Prod:

В каталоге проекта `ssl` запустить

    openssl dhparam -out dhparams.pem 4096

    certbot certonly --standalone\
        -d ${HOST_NAME},www.${HOST_NAME}\
        --email hellopanda.development@gmail.com\
        --rsa-key-size 4096\
        --agree-tos
    
    ln /etc/letsencrypt/archive/${PROJECT_NAME}/privkey1.pem privkey.pem
    ln /etc/letsencrypt/archive/${PROJECT_NAME}/fullchain1.pem fullchain.pem
    ln /etc/letsencrypt/archive/${PROJECT_NAME}/chain1.pem chain.pem


### Docker
    
Добавить переменные окружения

    cp .env.template .env
    ln .env env/common.env

    cp env/back.env.template env/back.env
    cp env/db.env.template env/db.env
|

    docker-compose run --rm backend python manage.py makemigrations
    docker-compose run --rm backend python manage.py migrate
    docker-compose run --rm backend python manage.py loaddata init_data.json

Без прокси

    docker-compose up --build

С прокси

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
|

    docker-compose run --rm backend python manage.py dumpdata --indent 2 --exclude contenttypes --exclude admin.logentry --output dump.json


## Верстка

https://github.com/HubArtWork/hubartwork.github.io/tree/master/panda
