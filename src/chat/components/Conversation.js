import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RootRef from '@material-ui/core/RootRef'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { contactTyping, contactStopTyping, messageDelivered, messageRead, newMessageReceived } from '../actions'
import ChatBackgroundImage from '../assets/background-chat.png'
import { NAME } from '../constants'
import { createSocket } from '../mocks'
import ContactStatus from './ContactStatus'
import MessageForm from './MessageForm'
import Thread from './Thread'

const styles = theme => ({
  contactName: {
    marginRight: theme.spacing.unit
  },
  container: {
    backgroundImage: `url("${ChatBackgroundImage}")`,
    height: '100%'
  },
  form: {
    backgroundColor: '#efefef',
    padding: theme.spacing.unit
  },
  header: {
    backgroundColor: '#eeeeee'
  },
  paper: {
    height: '100%'
  },
  thread: {
    flex: 1,
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    overflow: 'auto'
  }
})

class Conversation extends Component {
  containerRef = React.createRef()

  constructor(props)  {
    super(props)

    this.socket = createSocket(props.user.id)
  }

  componentDidMount() {
    const { contactTyping, contactStopTyping, messageDelivered, messageRead, newMessageReceived, user } = this.props

    this.containerRef.current.addEventListener('click', () => {
      this.socket.emit('message-read')
    })
    this.socket.on('message-delivered', ({ date, userId }) => {
      if (userId !== user.id) {
        messageDelivered(date)
      }
    })
    this.socket.on('message-read', ({ date, userId }) => {
      if (userId !== user.id) {
        messageRead(date)
      }
    })
    this.socket.on('new-message', ({ message, userId }) => {
      newMessageReceived(message)

      if (userId !== user.id) {
        this.socket.emit('message-delivered')
      }
    })
    this.socket.on('typing', ({ userId }) => {
      if (userId !== user.id) {
        contactTyping()
      }
    })
    this.socket.on('stop-typing', ({ userId }) => {
      if (userId !== user.id) {
        contactStopTyping()
      }
    })
  }

  render() {
    const { classes, contact, conversation, pendingMessages, user } = this.props

    return (
      <RootRef rootRef={this.containerRef}>
        <Paper className={classes.paper} elevation={4}>
          <Grid className={classes.container} direction="column" container>
            <Toolbar className={classes.header}>
              <Grid alignItems="flex-end" container>
                <Typography className={classes.contactName} variant="title">
                  {contact.name}
                </Typography>

                <ContactStatus readDate={conversation.data.readDate} />
              </Grid>
            </Toolbar>

            <Thread
              classes={{ container: classes.thread }}
              conversation={conversation}
              pendingMessages={pendingMessages}
              user={user}
            />

            <Grid className={classes.form} container>
              <MessageForm
                contactId={contact.id}
                disabled={!conversation}
                socket={this.socket}
                userId={user.id}
              />
            </Grid>
          </Grid>
        </Paper>
      </RootRef>
    )
  }
}

const mapStateToProps = state => ({
  conversation: state[NAME].conversation,
  pendingMessages: state[NAME].pendingMessages
})

const mapDispatchToProps = dispatch => ({
  contactTyping: () => dispatch(contactTyping()),
  contactStopTyping: () => dispatch(contactStopTyping()),
  messageDelivered: date => dispatch(messageDelivered(date)),
  messageRead: date => dispatch(messageRead(date)),
  newMessageReceived: message => dispatch(newMessageReceived(message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Conversation))