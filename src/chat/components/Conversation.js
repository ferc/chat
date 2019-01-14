import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import ChatBackgroundImage from '../assets/background-chat.png'
import { NAME } from '../constants'
import MessageForm from './MessageForm'
import Thread from './Thread'

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

class Conversation extends Component {
  render() {
    const { classes, contact, conversation, pendingMessages, user } = this.props

    return (
      <Grid className={classes.container} direction="column" container>
        <Thread
          classes={{ container: classes.thread }}
          conversation={conversation}
          pendingMessages={pendingMessages}
          user={user}
        />

        <Grid className={classes.form} container>
          <MessageForm contactId={contact.id} disabled={!conversation} userId={user.id} />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  conversation: state[NAME].conversation,
  pendingMessages: state[NAME].pendingMessages
})

export default connect(
  mapStateToProps
)(withStyles(styles)(Conversation))