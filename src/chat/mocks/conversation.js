import { conversation } from './data'
import { latency, wait } from './utils'

export const fetchConversationMock = async userId => {
  await wait(latency)

  return { data: conversation }
}
