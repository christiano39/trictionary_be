# Node / Express API quick start template

## Setup and commands
- run ```npm i -D```
- for development: ```npm run server```
- or ```npm start```
- to run tests (no tests included in template), ```npm test```
- migrate: ```npm run migrate```
- rollback: ```npm run rollback```
- seed: ```npm run seed```

## Using Docker
- rename ```SERVER_NAME``` in ```docker-compose.yml```
- copy ```.env.sample``` into ```.env``` and rename ```SERVER_NAME```
- install Docker
- run ```docker-compose up -d```

## Packages
The following packages are included in this template:
- [cors](https://www.npmjs.com/package/cors)
- [express](https://www.npmjs.com/package/express)
- [helmet](https://www.npmjs.com/package/helmet)
- [knex](https://www.npmjs.com/package/knex)
- [knex-cleaner](https://www.npmjs.com/package/knex-cleaner)
- [pg](https://www.npmjs.com/package/pg)
- [sqlite3](https://www.npmjs.com/package/sqlite3)

Dev:
- [cross-env](https://www.npmjs.com/package/cross-env)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)
