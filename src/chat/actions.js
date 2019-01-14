import uuid from 'uuid/v4'
import * as types from './actionTypes'
import { fetchConversationMock } from './mocks'

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

export const sendMessage = (socket, message) => async dispatch => {
  const trackId = uuid()

  const optimisticMessage = {
    ...message,
    date: new Date().toISOString(),
    trackId
  }

  dispatch(sendMessageRequest(optimisticMessage))

  socket.emit('new-message', optimisticMessage)
}

export const sendMessageError = (errorMessage, trackId) => ({
  type: types.SEND_MESSAGE_ERROR,
  errorMessage,
  trackId
})

export const sendMessageRequest = optimisticMessage => ({
  type: types.SEND_MESSAGE_REQUEST,
  optimisticMessage
})

export const messageDelivered = date => ({
  type: types.MESSAGE_DELIVERED,
  date
})

export const messageRead = date => ({
  type: types.MESSAGE_READ,
  date
})

export const newMessageReceived = message => ({
  type: types.NEW_MESSAGE_RECEIVED,
  message
})

export const contactTyping = () => ({
  type: types.CONTACT_TYPING
})

export const contactStopTyping = () => ({
  type: types.CONTACT_STOP_TYPING
})
