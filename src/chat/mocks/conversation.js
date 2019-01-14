import uuid from 'uuid/v4'
import { conversation } from './data'

const wait = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay))

export const fetchConversationMock = async userId => {
  await wait(1000)

  return { data: conversation }
}

export const sendMessageMock = async (userId, content, senderId) => {
  await wait(1000)

  return {
    data: {
      content,
      date: new Date().toISOString(),
      id: uuid(),
      senderId
    }
  }
}
