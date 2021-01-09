## Panda

### Установка приложения

### SSL

В `/etc/hosts` добавить `127.0.0.1 localhost dev.local`.

В каталоге проекта `ssl` запустить

    openssl dhparam -out dhparams.pem 4096
    
dev:

    openssl req -config .conf -new -sha256 -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out csr.pem -subj '/CN=localhost'

prod:

    certbot certonly --standalone\
        -d hellopanda.com.ua,www.hellopanda.com.ua\
        --email hellopanda.development@gmail.com\
        --rsa-key-size 4096\
        --agree-tos
    

### Запуск RTC-сервера

В папке `rtc_server` запустить

    npx run server


### Docker
    
    cp .env.template .env
    ln .env env/common.env

    docker-compose run backend python manage.py dumpdata --indent 2 --exclude contenttypes --exclude admin.logentry --output dump.json
    
    docker-compose run backend python manage.py makemigrations
    docker-compose run backend python manage.py migrate
    docker-compose run backend python manage.py loaddata dump.json
    
    docker-compose run backend python manage.py collectstatic --no-input
    
    docker-compose up --build
    
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
