## Laravel 10 & React 18 development setup with basic crud operations using Docker and deployed build with Nginx on Ubuntu 20.04.

### Getting Started

Here is project structure divided into three parts

1. /elogbooks-api (Laravel backend)
2. /elogbooks-react (React frontend) 
3. /laradock (Docker setup to create development environment for laravel and React)

### Docker setup

Laradock is a full PHP development environment for Docker.

There are so many services configured in this setup that we could need during php development and javascript development.

I have just setup docker for this demo, if you need more detail how to setup docker in more detail. Go here: [Laradock setup](https://laradock.io/).

1. If not already done, [install Docker](https://docs.docker.com/get-docker/). After docker has been installed.
2. Go to this location for backend laravel project nginx configuration. laradock/nginx/sites/elogbooks-api.conf 

    Nginx server configuration for you backend laravel project to run it on local domain name.

    In my case i have added server_name elogbooks.api.
```
server {

    listen 80;
    listen [::]:80;

    # For https
    # listen 443 ssl;
    # listen [::]:443 ssl ipv6only=on;
    # ssl_certificate /etc/nginx/ssl/default.crt;
    # ssl_certificate_key /etc/nginx/ssl/default.key;

    server_name elogbooks.api;
    root /var/www/elogbooks-api/public;
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /var/log/nginx/laravel_error.log;
    access_log /var/log/nginx/laravel_access.log;
}
```

3. Edit /etc/hosts file on host machine, and add a record:
```
127.0.0.1       elogbooks.api
```
4. Go to this location for react project nginx configuration. laradock/nginx/sites/elogbooks-react.conf 

    Nginx server configuration for you react project to run deployed build on local domain name.

    In my case i have added server_name elogbooks.react.
```
server {
        listen 80;
        listen [::]:80;
        server_name elogbooks.react;
        root /var/www/elogbooks-react/build;
        index index.html;
        location / {
                try_files $uri $uri/ /index.html =404;
        }
}
```
5. Edit /etc/hosts file on host machine, and add a record:
```
127.0.0.1       elogbooks.react
```
6. Go to root of laravel application and rename .env.example to .env

7. Open terminal inside this 'laradock' folder

   Run this command
```
 docker-compose build nginx phpmyadmin workspace
```

These are three images that will be build by docker and to create your development environment for your both projects laravel & react.

If you have a look on this docker file you will see a lot of things will be build in this docker container.
```
laradock/workspace/Dockerfile
```
8. After all docker container images build successfully then run your images to active your development environment to run your both applications laravel & react.

```
docker-compose up -d nginx  phpmyadmin workspace
```
9. Now laravel application will be host successfully and you can open it.

   This is root point of it
```
http://elogbooks.api
```
10. You can open your deployed react application from this endpoint.
```
http://elogbooks.react
```

11. You can look basic laravel implementation with some basic operations/features.
    Migrations.

#### Features

* Migrations
* Seeding with adding some fake data (In my case i have added some entries in properties table)
* Validation classes
* routing
* Service layer separating your business logic
* Models creations
* Controller creations
* Resources creation for api responses
* pagination
* search

12. You can look basic react implementation with a list and
‘log a job’ view
   
#### Features
* Basic structure for small scale application
* Routing
* Redux setup with saga and logging (State management tool).
* Added react material ui library for UI components.
* Added axios for api calls
* pagination
* searching table view