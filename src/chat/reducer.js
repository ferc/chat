import * as types from './actionTypes'

const initialState = {
  conversation: {
    data: {
      deliveredDate: null,
      messages: [],
      readDate: null
    },
    error: null,
    loading: false
  },
  contactIsTyping: false,
  pendingMessages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACT_STOP_TYPING:
      return {
        ...state,
        contactIsTyping: false
      }
    case types.CONTACT_TYPING:
      return {
        ...state,
        contactIsTyping: true
      }
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
    case types.MESSAGE_DELIVERED:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          data: {
            ...state.conversation.data,
            deliveredDate: action.date
          }
        }
      }
    case types.MESSAGE_READ:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          data: {
            ...state.conversation.data,
            readDate: action.date
          }
        }
      }
    case types.SEND_MESSAGE_ERROR: {
      const pendingMessages = [].concat(
        state.pendingMessages.map(message => {
          if (message.trackId !== action.trackId) return message

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
    case types.NEW_MESSAGE_RECEIVED: {
      const pendingMessages = state.pendingMessages.filter(message =>
        message.trackId !== action.message.trackId
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
