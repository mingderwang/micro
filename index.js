const { json, send, sendError } = require('micro')
const micro = require('micro')
const qs = require('querystring')
const url = require('url')

/**
 * handle POST requests
 */
async function postHandler(request) {
  console.log('post', request.headers)
}
/**
 * handle GET requests
 */
async function getHandler(request) {
  console.log('get', request.headers)
  const query = qs.parse(url.parse(request.url).query)
  console.log('query parse',query)
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
