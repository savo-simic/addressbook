# Test Project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Download and install [Docker](https://www.docker.com/get-started).
Download and install [MySQL Workbench](https://www.mysql.com/products/workbench/).
Download and install [Postman](https://www.postman.com/downloads/).
Create database with credentials that matches .env file ie 
```sh
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=db_test
DB_USERNAME=root
DB_PASSWORD=root
```

### Set up project

Create empty directory for project:

```sh
mkdir test
cd test
```

Clone addressbook backend project:

```sh
git clone https://github.com/savovivant/addressbook.git
```

In your favorite IDE open `addressbook` directory, and:

Now from addressbook(where is located docker-compose.yml) directory you should be able to start and stop docker containers using terminal.

Start:

```sh
sudo docker-compose up -d --build site
```

Stop:

```sh
docker-compose down
```

Now access docker container with project files with:

```sh
sudo docker-compose exec php /bin/sh
```

Run composer install
```sh
composer install
```

Run migrations
```sh
php artisan migrate
```

Run install passport
```sh
php artisan passport:install
```

### Run project

From your terminal navigate to client folder inside addressbook folder

Run npm install
```sh
npm install
```

Run npm start
```sh
npm start
```
 
 In your browser navigate to: http://localhost:3000/login
 
 Login user with:

- Email: admin@test.com
- Password: 1111

### API example routes
Get a list of all contacts
```sh
http://localhost:88/api/contacts/index
```
Create new contact
```sh
http://localhost:88/api/contacts/create
```

Update contact using id
```sh
http://localhost:88/api/contacts/update/1
```

Delete contact using id
```sh
http://localhost:88/api/contacts/delete/1
```







