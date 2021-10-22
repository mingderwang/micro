const { json, send, sendError, buffer, text } = require('micro')
const micro = require('micro')
const qs = require('querystring')
const url = require('url')
const thinkagain = require('thinkagain')(/* rethinkdbdash options */)
const { request } = require('graphql-request')
const etherspot_endpoint = 'https://etherspot.pillarproject.io/'

// Prepare simple query
const query = `
 query {
	blockStats {
	  currentBlockNumber
	}
  }
`

const Post = thinkagain.createModel('Post', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    idAuthor: { type: 'string' },
  },
  required: ['title'],
})

const Attribute = thinkagain.createModel('Attribute', {
  type: 'array',
  items: {
    type: 'number',
  },
})

const Author = thinkagain.createModel('Author', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['name'],
})

// Join the models
Post.belongsTo(Author, 'author', 'idAuthor', 'id')
/**
 * handle POST requests
 */
async function postHandler(req) {
  console.log('post', req.headers)
  const buf = await buffer(req)
  console.log(buf)
  // <Buffer 7b 22 70 72 69 63 65 22 3a 20 39 2e 39 39 7d>
  const txt = await text(req)
  console.log(txt)
  // '{"price": 9.99}'
  const js = await json(req)
  console.log(js.price)
  // 9.99
  // Create a new author
  var author = new Author({
    name: 'Ming',
  })
  let post = new Post({
    title: 'Hello Ming!',
    content: 'This is another example.',
  })
  post.author = author

  post.saveAll().then((result) => console.log(result))
  return ''
}
/**
 * handle GET requests
 */
async function getHandler(req) {
  const data = await request(etherspot_endpoint, query, { title: 'Inception' })

  // Return Movie
  console.log('graphql data', data)

  const payload = await json(req)
  console.log('payload', payload)
  const query2 = qs.parse(url.parse(req.url).query)
  console.log('query', query2)
  Post.get('6a1be0aa-f7b5-47f5-a954-90824691f227')
    .getJoin()
    .run()
    .then(console.log)
}

/**
 * Check the request method and use postHandler or getHandler (or other method handlers)
 */
async function methodHandler(request, response) {
  try {
    switch (request.method) {
      case 'POST':
        return await postHandler(request)
      case 'GET':
        return await getHandler(request)
      default:
        send(response, 405, 'Invalid method')
        break
    }
  } catch (error) {
    throw error
  }
}

const server = micro(async (request, response) => {
  try {
    console.log('response', response.outputData)

    send(response, 200, await methodHandler(request))
  } catch (error) {
    sendError(request, response, error)
  }
})
console.log('listen on port' + process.env.PORT)
server.listen(process.env.PORT)
