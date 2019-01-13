import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import ChatBackgroundImage from '../assets/background-chat.png'
import messageStatus from '../enums/messageStatus'
import Message from './Message'
import MessageForm from './MessageForm'

const styles = theme => ({
  container: {
    backgroundImage: `url("${ChatBackgroundImage}")`,
    height: '100%'
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: theme.spacing.unit
  },
  thread: {
    flex: 1,
    paddingBottom: theme.spacing.unit * 2,
    overflow: 'auto'
  }
})

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
    const { classes, deliveredDate, messages, readDate, user } = this.props

    const thread = messages.map(({ date, id, message, senderId }) => {
      const isCurrentUser = senderId === user.id
      const status = getMessageStatus({
        deliveredDate,
        isCurrentUser,
        messageDate: date,
        readDate
      })

      return (
        <Grid key={id} item>
          <Message
            date={date}
            isCurrentUser={isCurrentUser}
            message={message}
            status={status}
          />
        </Grid>
      )
    })

    return (
      <Grid className={classes.container} direction="column" container>
        <Grid className={classes.thread} direction="column" wrap="nowrap" container>
          {thread}
        </Grid>

        <Grid className={classes.form} container>
          <MessageForm />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Conversation)