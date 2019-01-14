import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import * as events from '../eventNames'
import ContactStatus from './ContactStatus'
import MessageForm from './MessageForm'
import Thread from './Thread'

const styles = theme => ({
  contactName: {
    marginRight: theme.spacing.unit
  },
  contactStatus: {
    paddingBottom: theme.spacing.unit / 2
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

export class Conversation extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    contactTyping: PropTypes.func.isRequired,
    contactStopTyping: PropTypes.func.isRequired,
    conversation: PropTypes.shape({
      data: PropTypes.shape({
        deliveredDate: PropTypes.string,
        messages: PropTypes.arrayOf(
          PropTypes.shape({
            content: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            receiverId: PropTypes.string.isRequired
          })
        ).isRequired,
        readDate: PropTypes.string
      }),
      error: PropTypes.string,
      loading: PropTypes.bool.isRequired
    }).isRequired,
    messageDelivered: PropTypes.func.isRequired,
    messageRead: PropTypes.func.isRequired,
    newMessageReceived: PropTypes.func.isRequired,
    pendingMessages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        error: PropTypes.bool,
        receiverId: PropTypes.string.isRequired,
        trackId: PropTypes.string.isRequired
      })
    ).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }

  containerRef = React.createRef()

  constructor(props)  {
    super(props)

    this.socket = createSocket(props.user.id)
  }

  componentDidMount() {
    const { contactTyping, contactStopTyping, messageDelivered, messageRead, newMessageReceived, user } = this.props

    this.containerRef.current.addEventListener('click', () => {
      this.socket.emit(events.MESSAGE_READ)
    })
    this.socket.on(events.MESSAGE_DELIVERED, ({ date, userId }) => {
      if (userId !== user.id) {
        messageDelivered(date)
      }
    })
    this.socket.on(events.MESSAGE_READ, ({ date, userId }) => {
      if (userId !== user.id) {
        messageRead(date)
      }
    })
    this.socket.on(events.NEW_MESSAGE, ({ message, userId }) => {
      newMessageReceived(message)

      if (userId !== user.id) {
        this.socket.emit(events.MESSAGE_DELIVERED)
      }
    })
    this.socket.on(events.TYPING, ({ userId }) => {
      if (userId !== user.id) {
        contactTyping()
      }
    })
    this.socket.on(events.STOP_TYPING, ({ userId }) => {
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
                <Typography className={classes.contactName} data-testid="contact-name" variant="h6">
                  {contact.name}
                </Typography>

                <ContactStatus
                  classes={{ text: classes.contactStatus }}
                  readDate={conversation.data.readDate}
                />
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