import React, { Component } from 'react'
import Conversation from './Conversation'

const mockProps = {
  deliveredDate: '2019-01-12T16:33:21.304Z',
  messages: [{
    date: '2019-01-12T15:20:21.304Z',
    id: '4343c376-5dd9-4ea0-b029-7380ada5e7f4',
    message: 'Hello',
    senderId: 'd94b8c66-7de0-4403-b4df-ed469864c771'
  }, {
    date: '2019-01-12T16:31:11.304Z',
    id: '55a3b802-ce64-40df-b195-486a05e8ec4e',
    message: 'Hello!',
    senderId: '622e2331-5a61-4164-a831-61813134fd43'
  }, {
    date: '2019-01-12T16:31:21.304Z',
    id: '45ec319d-942e-4ecf-8286-f100046e5044',
    message: 'How are you?',
    senderId: '622e2331-5a61-4164-a831-61813134fd43'
  }, {
    date: '2019-01-12T16:32:21.304Z',
    id: '6738ae99-4445-4f8f-944f-ae79be9602d2',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    senderId: 'd94b8c66-7de0-4403-b4df-ed469864c771'
  }, {
    date: '2019-01-12T16:33:21.304Z',
    id: 'bd589121-d442-4cd2-9765-f6a8883da88d',
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