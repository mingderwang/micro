# mirco [![Build Status](https://travis-ci.org/mingderwang/mirco.svg?branch=master)](https://travis-ci.org/mingderwang/mirco)

> My magnificent microservice

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/mingderwang/mirco)


## Usage

```bash
$ npm install --global mirco
$ mirco
```


## Deployment

```sh
vercel
```

## License

MIT ©2021 Ming-der Wang

# rethinkdb 
## install and start yoru rethinkdb locally

> install rethinkdb from https://rethinkdb.com/

```sh
$ rethinkdb                 
Recursively removing directory /private/tmp/frontend/rethinkdb_data/tmp
Initializing directory /private/tmp/frontend/rethinkdb_data
Running rethinkdb 2.4.1 (CLANG 11.0.3 (clang-1103.0.32.62))...
Running on Darwin 20.6.0 x86_64
Loading data from directory /private/tmp/frontend/rethinkdb_data
warn: Cache size does not leave much memory for server and query overhead (available memory: 325 MB).
warn: Cache size is very low and may impact performance.
Listening for intracluster connections on port 29015
Listening for client driver connections on port 28015
Listening for administrative HTTP connections on port 8080
Listening on cluster addresses: 127.0.0.1, ::1
Listening on driver addresses: 127.0.0.1, ::1
Listening on http addresses: 127.0.0.1, ::1
To fully expose RethinkDB on the network, bind to all addresses by running rethinkdb with the `--bind all` command line option.
Server ready, "MingderdeMBP_ld2" 6db1448b-c869-45fd-b555-fd670d1002c2
```

> test your rethinkdb

```sh
node app.js
```

> admin or monitoring your rethinkdb on http://localhost:8080


# test with ava
```sh
yarn test
```

# test with your initial micro
```
curl -X POST  -d '{"text": "Hello!"}' http://localhost:3000
{"text":"Hello!"}
```
index.js
```'use strict';

const {json} = require('micro');

module.exports = async req => {
	const body = await json(req);

	// let's echo the text
	return {text: body.text};
};
```
