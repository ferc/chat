import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import Message from './Message'

class Conversation extends Component {
  static defaultProps =  {
    messages: []
  }

  render() {
    const { messages, user } = this.props

    const thread = messages.map(({ date, message, senderId }) => {
      const isCurrentUser = senderId === user.id

      return (
        <Message
          date={date}
          isCurrentUser={isCurrentUser}
          key={`${senderId}.${date}`}
          message={message}
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