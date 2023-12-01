const http = require('node:http')
const { urls: _urls } = require('./urls.ts')

const port = 1234

const dittoJSON = require('./mocks/ditto.json')

/**
 * Processes the request.
 * @req
 * @res
 * @returns {Function} endpoint response.
 */
const processRequest = (
  req: { method: 'GET' | 'POST'; url: String; on: Function },
  res: {
    statusCode: '200' | '201' | '404'
    setHeader: Function
    writeHead: Function
    end: Function
  },
) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case _urls.home:
          res.statusCode = '200'
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          return res.end('<h1>Bienvenido a la página de inicio</h1>')
        case _urls.ditto:
          res.statusCode = '200'
          res.setHeader('Content-type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = '404'
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not found</h1>')
      }
    case 'POST':
      switch (url) {
        case _urls.pokemon:
          let body = ''
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString()
          })
          return req.on('end', () => {
            console.log('body ', body)
            const data = JSON.parse(body)
            res.writeHead(
              '201',
              'Content-type: application/json; charset=utf-8',
            )
            res.end(JSON.stringify(data))
          })

        default:
          res.statusCode = '404'
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not found</h1>')
      }
    default:
      break
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
