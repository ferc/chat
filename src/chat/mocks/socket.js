import Emitter from 'component-emitter'
import uuid from 'uuid/v4'
import * as events from '../eventNames'
import { latency, wait } from './utils'

const server = new Emitter()

export default userId => {
  const client = new Emitter()

  client.on(events.MESSAGE_DELIVERED, async () => {
    await wait(latency)

    server.emit(events.MESSAGE_DELIVERED, {
      date: new Date().toISOString(),
      userId
    })
  })

  client.on(events.MESSAGE_READ, async () => {
    await wait(latency)

    server.emit(events.MESSAGE_READ, {
      date: new Date().toISOString(),
      userId
    })
  })

  client.on(events.NEW_MESSAGE, async ({ content, image, receiverId, trackId }) => {
    await wait(latency)

    server.emit(events.NEW_MESSAGE, {
      message: {
        content,
        date: new Date().toISOString(),
        id: uuid(),
        image,
        receiverId,
        trackId,
      },
      userId
    })
  })

  client.on(events.STOP_TYPING, async () => {
    await wait(latency)

    server.emit(events.STOP_TYPING, {
      userId
    })
  })

  client.on(events.TYPING, async () => {
    await wait(latency)

    server.emit(events.TYPING, {
      userId
    })
  })

  return {
    emit: client.emit.bind(client),
    on: server.on.bind(server),
    off: server.off.bind(server)
  }
}
