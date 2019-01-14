import uuid from 'uuid/v4'
import * as types from './actionTypes'
import { fetchConversationMock, sendMessageMock } from './mocks'

export const fetchConversation = userId => async dispatch => {
  try {
    dispatch(fetchConversationRequest())

    const { data } = await fetchConversationMock(userId)

    dispatch(fetchConversationSuccess(data))
  } catch(e) {
    dispatch(fetchConversationError('There was an error on fetching the conversation'))
  }
}

export const fetchConversationError = errorMessage => ({
  type: types.FETCH_CONVERSATION_ERROR,
  errorMessage
})

export const fetchConversationRequest = () => ({
  type: types.FETCH_CONVERSATION_REQUEST
})

export const fetchConversationSuccess = conversation => ({
  type: types.FETCH_CONVERSATION_SUCCESS,
  conversation
})

export const sendMessage = (userId, content, senderId) => async dispatch => {
  const tempId = uuid()

  try {
    const optimisticMessage = {
      date: new Date().toISOString(),
      content,
      senderId,
      tempId
    }

    dispatch(sendMessageRequest(optimisticMessage))

    const { data } = await sendMessageMock(userId, content, senderId)

    dispatch(sendMessageSuccess(data, tempId))
  } catch(e) {
    dispatch(sendMessageError('There was an error on sending the message', tempId))
  }
}

export const sendMessageError = (errorMessage, tempId) => ({
  type: types.SEND_MESSAGE_ERROR,
  errorMessage,
  tempId
})

export const sendMessageRequest = optimisticMessage => ({
  type: types.SEND_MESSAGE_REQUEST,
  optimisticMessage
})

export const sendMessageSuccess = (message, tempId) => ({
  type: types.SEND_MESSAGE_SUCCESS,
  message,
  tempId
})
