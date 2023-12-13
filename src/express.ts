import { Express, Response, Request } from 'express/'

const initMiddlewares = require('./middleware')
const express = require('express')
const ditto = require('./mocks/ditto.json')
const { urls } = require('./urls')

const app: Express = express()

const PORT = process.env.PORT ?? 1234

initMiddlewares(app)

app.disable('x-powered-by')

app.get(urls.home, (req: Request, res: Response) => {
  res.send('<h1>Bienvenido a la página de inicio</h1>')
})

app.get(urls.ditto, (req: Request, res: Response) => {
  res.json(ditto)
})

app.post(urls.pokemon, (req: Request, res: Response) =>
  // @ts-ignore
  res.status(201).send(res.body),
)

app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
