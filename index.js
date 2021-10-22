const { json, send, sendError, buffer, text } = require('micro')
const micro = require('micro')
const qs = require('querystring')
const url = require('url')

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
  return ''
}
/**
 * handle GET requests
 */
async function getHandler(request) {
  console.log('get', request.headers)
  const query = qs.parse(url.parse(request.url).query)
  console.log('query parse', query)
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
