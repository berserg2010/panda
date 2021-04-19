## Panda

### Установка приложения

### SSL


В каталоге проекта `ssl` запустить

    openssl dhparam -out dhparams.pem 4096
    
Dev:

В `/etc/hosts` добавить `127.0.0.1 localhost ${HOST_NAME}`.

    openssl req -config .conf -new -sha256 -newkey rsa:2048 -nodes\
        -keyout privkey.pem -x509 -days 365\
        -out fullchain.pem -subj '/CN=localhost'

Prod:

    certbot certonly --standalone\
        -d ${HOST_NAME},www.${HOST_NAME}\
        --email hellopanda.development@gmail.com\
        --rsa-key-size 4096\
        --agree-tos
    
    ln /etc/letsencrypt/archive/${PROJECT_NAME}/privkey1.pem privkey.pem
    ln /etc/letsencrypt/archive/${PROJECT_NAME}/fullchain1.pem fullchain.pem
    ln /etc/letsencrypt/archive/${PROJECT_NAME}/chain1.pem chain.pem


### Запуск RTC-сервера

В папке `rtc_server` запустить

    npx run server


### Docker
    
    cp .env.template .env
    ln .env env/common.env

    docker-compose run --rm backend python manage.py dumpdata --indent 2 --exclude contenttypes --exclude admin.logentry --output dump.json
    
    docker-compose run --rm backend python manage.py makemigrations
    docker-compose run --rm backend python manage.py migrate
    docker-compose run --rm backend python manage.py loaddata dump.json
    
    docker-compose run --rm backend python manage.py collectstatic --no-input
    
    docker-compose up --build
    
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build


## Верстка

https://github.com/HubArtWork/hubartwork.github.io/tree/master/panda
