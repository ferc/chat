import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import messageStatus from '../enums/messageStatus'
import Message from './Message'

const getMessageStatus = ({
  deliveredDate,
  error,
  id,
  isCurrentUser,
  messageDate,
  readDate
}) => {
  if (!isCurrentUser) return null
  if (error) return messageStatus.error
  if (messageDate <= readDate) return messageStatus.read
  if (messageDate <= deliveredDate) return messageStatus.delivered
  if (id) return messageStatus.sent
  return messageStatus.sending
}

class Thread extends Component {
  render() {
    const { classes, conversation, pendingMessages, user } = this.props
    const { data, loading } = conversation

    if (!data || loading) {
      return (
        <Grid className={classes.container} alignItems="center" justify="center" direction="row" container>
          <CircularProgress />
        </Grid>
      )
    }

    const { deliveredDate, messages, readDate } = data

    const thread = messages
      .concat(pendingMessages)
      .map(({ content, date, error, id, senderId, tempId }) => {
        const isCurrentUser = senderId === user.id
        const status = getMessageStatus({
          deliveredDate,
          error,
          id,
          isCurrentUser,
          messageDate: date,
          readDate
        })

        return (
          <Grid key={id || tempId} item>
            <Message
              content={content}
              date={date}
              isCurrentUser={isCurrentUser}
              status={status}
            />
          </Grid>
        )
      })

    return (
      <Grid className={classes.container} direction="column" wrap="nowrap" container>
        {thread}
      </Grid>
    )
  }
}

export default Thread
