import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import messageStatus from '../enums/messageStatus'
import Message from './Message'

const getMessageStatus = ({
  deliveredDate,
  isCurrentUser,
  messageDate,
  readDate
}) => {
  if (!isCurrentUser) return null
  if (messageDate <= readDate) return messageStatus.read
  if (messageDate <= deliveredDate) return messageStatus.delivered
  return messageStatus.sent
}

class Conversation extends Component {
  static defaultProps =  {
    messages: []
  }

  render() {
    const { deliveredDate, messages, readDate, user } = this.props

    const thread = messages.map(({ date, id, message, senderId }) => {
      const isCurrentUser = senderId === user.id
      const status = getMessageStatus({
        deliveredDate,
        isCurrentUser,
        messageDate: date,
        readDate
      })

      return (
        <Message
          date={date}
          isCurrentUser={isCurrentUser}
          key={id}
          message={message}
          status={status}
        />
      )
    })

    return (
      <Grid direction="column" container>
        {thread}
      </Grid>
    )
  }
}

export default Conversation