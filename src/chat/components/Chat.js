import React, { Component } from 'react'
import Conversation from './Conversation'

const mockProps = {
  develiveredDate: '2019-01-12T16:33:21.304Z',
  messages: [{
    date: '2019-01-12T15:20:21.304Z',
    message: 'Hello',
    senderId: 'd94b8c66-7de0-4403-b4df-ed469864c771'
  }, {
    date: '2019-01-12T16:31:11.304Z',
    message: 'Hello!',
    senderId: '622e2331-5a61-4164-a831-61813134fd43'
  }, {
    date: '2019-01-12T16:31:21.304Z',
    message: 'How are you?',
    senderId: '622e2331-5a61-4164-a831-61813134fd43'
  }, {
    date: '2019-01-12T16:32:21.304Z',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    senderId: 'd94b8c66-7de0-4403-b4df-ed469864c771'
  }, {
    date: '2019-01-12T16:33:21.304Z',
    message: 'Bye!',
    senderId: '622e2331-5a61-4164-a831-61813134fd43'
  }],
  readDate: '2019-01-12T16:32:21.304Z'
}

class Chat extends Component {
  render() {
    const { user } = this.props

    return (
      <Conversation {...mockProps} user={user} />
    )
  }
}

export default Chat