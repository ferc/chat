import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import RootRef from '@material-ui/core/RootRef'
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
  containerRef = React.createRef()

  componentDidUpdate(prevProps) {
    const { conversation, pendingMessages } = this.props
    const { data, loading } = conversation

    if (loading) return
    if (
      prevProps.conversation.data.messages === data.messages &&
      prevProps.pendingMessages === pendingMessages
    ) return

    const node = this.containerRef.current

    node.scrollTo(null, node.scrollHeight)
  }

  render() {
    const { classes, conversation, pendingMessages, user } = this.props
    const { data, loading } = conversation

    if (loading) {
      return (
        <Grid className={classes.container} alignItems="center" justify="center" direction="row" container>
          <CircularProgress />
        </Grid>
      )
    }

    const { deliveredDate, messages, readDate } = data

    const thread = messages
      .concat(pendingMessages)
      .sort((a, b) => {
        if (a.date < b.date) return -1
        if (a.date > b.date) return 1
        return 0
      })
      .map(({ content, date, error, id, receiverId, trackId }) => {
        const isCurrentUser = receiverId !== user.id
        const status = getMessageStatus({
          deliveredDate,
          error,
          id,
          isCurrentUser,
          messageDate: date,
          readDate
        })

        return (
          <Grid  key={id || trackId} item>
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
      <RootRef rootRef={this.containerRef}>
        <Grid className={classes.container} direction="column" wrap="nowrap" container>
          {thread}
        </Grid>
      </RootRef>
    )
  }
}

export default Thread
