import { Express, NextFunction, Request, Response } from 'express'

/**
 * Middleware: Moves to next function with a transformed body.
 * @req
 * @res
 * @next
 * @example res.body --> { name: 'ditto', type: 'normal', moves: [ 'transform' ] }
 */
const postBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method == 'POST') {
    let body = ''
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const data = JSON.parse(body)
      console.log(data)
      // @ts-ignore
      res.body = data
      next()
    })
  } else {
    next()
  }
}

/**
 * Sets all middlewares.
 * @app
 * @example app.use((req, res, next) => myMiddleware(req, res, next))
 */
const initMiddlewares = (app: Express) => {
  app.use((req, res, next) => postBodyMiddleware(req, res, next))
}

module.exports = initMiddlewares
