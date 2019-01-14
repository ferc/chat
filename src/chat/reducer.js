import * as types from './actionTypes'

const initialState = {
  conversation: {
    data: null,
    error: null,
    loading: false
  },
  pendingMessages: []
}

export default (state = initialState, action) => {
  console.log('reducer', action)

  switch (action.type) {
    case types.FETCH_CONVERSATION_ERROR:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          error: action.errorMessage
        }
      }
    case types.FETCH_CONVERSATION_REQUEST:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          loading: true
        }
      }
    case types.FETCH_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversation: {
          data: action.conversation,
          error: null,
          loading: false
        }
      }
    case types.SEND_MESSAGE_ERROR: {
      const pendingMessages = [].concat(
        state.pendingMessages.map(message => {
          if (message.tempId !== action.tempId) return message

          message.error = true

          return message
        })
      )

      return {
        ...state,
        pendingMessages
      }
    }
    case types.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        pendingMessages: [
          ...state.pendingMessages,
          action.optimisticMessage
        ]
      }
    case types.SEND_MESSAGE_SUCCESS: {
      const pendingMessages = state.pendingMessages.filter(message =>
        message.tempId !== action.tempId
      )

      return {
        ...state,
        conversation: {
          ...state.conversation,
          data: {
            ...state.conversation.data,
            messages: [
              ...state.conversation.data.messages,
              action.message
            ]
          }
        },
        pendingMessages
      }
    }
    default:
      return state
  }
}
