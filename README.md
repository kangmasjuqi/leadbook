# LEADBOOK 

### 0. My Env Snapshot

    php -v

        PHP 7.3.11 (cli) (built: Jun  5 2020 23:50:40) ( NTS )
        Copyright (c) 1997-2018 The PHP Group
        Zend Engine v3.3.11, Copyright (c) 1998-2018 Zend Technologies

    node -v

        v14.17.1

    npm -v

        6.14.13

    mysql -V

        mysql  Ver 14.14 Distrib 5.7.30, for macos10.14 (x86_64) using  EditLine wrapper

### A. Setup DB

    1. in MySQL DB, run command : CREATE DATABASE `leadbook`;
    2. update db config in .env file

        DB_DATABASE=leadbook
        DB_USERNAME=YOUR_USER
        DB_PASSWORD=YOUR_PASS


### B. Setup Backend

    1. run command : composer install

    2. run command : php artisan key:generate

    3. run command : php artisan migrate

    4. run command : php artisan db:seed

*default generated user password would be : "secret"


### C. Setup Frontend

    1. run command : yarn install


### D. Access web app :

    1. Start Backend -> open terminal then run command : php artisan serve

    2. Start Frontend -> open terminal then run command : yarn watch-poll

    3. Access web app -> http://localhost:3000/login

### E. Screencast / Demo

Demo : 

https://github.com/kangmasjuqi/leadbook/blob/main/Final_Leadbook_Screencast-2021.11.09-22_35_49.webm

https://youtu.be/uis0S89KwZc

Note :

For feature Register & Forgot Password I did not exactly send email to the real account, but I store the email content in the laravel log instead https://github.com/kangmasjuqi/leadbook/blob/main/storage/logs/laravel.log. Don't forget to replace `&amp;` string into `&` char in the generated link if you are going to use that generated link.

### F. Author Contact

    e : marjuqi[dot]rahmat[at]gmail[dot]com
    p : +62-812-9579-8341

