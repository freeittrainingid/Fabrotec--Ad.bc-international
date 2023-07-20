<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

--- In the root of the project, build and run the Docker containers:
# docker-compose up -d

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

### Tests: this is simple test using curl command and the output

```bash
# add 1 user (NO ERROR, NO REVERT)
curl -X POST http://localhost:3000/user/addMultiple \
-H 'Content-Type: application/json' \
-d '{"type":"my_login","cmd_chain":[{"type":"sql_safe","cmd":"INSERT INTO \"Users\" VALUES (1, '\''tom'\'', '\''France'\'', NULL);"}]}'

return_object = {
	status: "ok", # status 200
	dbState: ["(1, 'tom', 'France', NULL)"]
}

# add same user (RETURN ERROR CODE, REVERT CHANGE)
curl -X POST http://localhost:3000/user/addMultiple \
-H 'Content-Type: application/json' \
-d '{"type":"my_login","cmd_chain":[{"type":"sql_safe","cmd":"INSERT INTO \"Users\" VALUES (2, '\''frog'\'', '\''France'\'', NULL);"},{"type":"sql_safe","cmd":"INSERT INTO \"Users\" VALUES (1, '\''sammy'\'', '\''France'\'', NULL);"}]}'

return_object = {
	status: "error", # status 400
	dbState: ["(1, 'tom', 'France', NULL)"]
}

# add 2 users synchronously (NO ERROR, NO REVERT)
curl -X POST http://localhost:3000/user/addMultiple \
-H 'Content-Type: application/json' \
-d '{"type":"my_login","cmd_chain":[{"type":"sql_safe","cmd":"INSERT INTO \"Users\" VALUES (2, '\''frog'\'', '\''France'\'', NULL);"},{"type":"sql_safe","cmd":"INSERT INTO \"Users\" VALUES (3, '\''sam'\'', '\''England'\'', 1);"}]}'

return_object = {
	status: "ok", # status 200
	dbState: ["(1, 'tom', 'France', NULL)", "(2, 'frog', 'France', NULL)", "(3, 'sam', 'England', 1)"]
}

# Invalid Foreign Key error thrown by DB (RETURN ERROR CODE, REVERT CHANGE)
curl -X POST http://localhost:3000/user/addMultiple \
-H 'Content-Type: application/json' \
-d '{"type":"my_login","cmd_chain":[{"type":"sql_safe","cmd":"INSERT INTO \"Users\" (Uid, Username, City, Friend) VALUES (4, '\''croak'\'', '\''Malaysia'\'', NULL);"},{"type":"sql_safe","cmd":"INSERT INTO \"Users\" (Uid, Username, City, Friend) VALUES (5, '\''ding'\'', '\''Finland'\'', 100);"}]}'

return_object = {
	status: "error", # status 400
	dbState: ["(1, 'tom', 'France', NULL)", "(2, 'frog', 'France', NULL)", "(3, 'sam', 'England', 1)"]
}
```

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
