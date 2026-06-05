import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from 'node:http'

const server = createServer((_: IncomingMessage, response: ServerResponse) => {
  response.end('Hello World!')
})

server.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000')
})
