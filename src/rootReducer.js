import { combineReducers } from 'redux'
import chat from './chat'

export default combineReducers({
  [chat.constants.NAME]: chat.reducer
})
