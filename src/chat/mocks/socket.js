import Emitter from 'component-emitter'
import uuid from 'uuid/v4'

const server = new Emitter()

export default userId => {
  const client = new Emitter()

  client.on('message-delivered', () => {
    server.emit('message-delivered', {
      date: new Date().toISOString(),
      userId
    })
  })

  client.on('message-read', () => {
    server.emit('message-read', {
      date: new Date().toISOString(),
      userId
    })
  })

  client.on('new-message', ({ content, receiverId, trackId }) => {
    server.emit('new-message', {
      message: {
        content,
        date: new Date().toISOString(),
        id: uuid(),
        receiverId,
        trackId,
      },
      userId
    })
  })

  client.on('stop-typing', () => {
    server.emit('stop-typing', {
      userId
    })
  })

  client.on('typing', () => {
    server.emit('typing', {
      userId
    })
  })

  return {
    emit: client.emit.bind(client),
    on: server.on.bind(server),
    off: server.off.bind(server)
  }
}
