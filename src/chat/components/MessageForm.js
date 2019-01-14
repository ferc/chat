import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'
import { sendMessage } from '../actions'
import { STOP_TYPING, TYPING } from '../eventNames'

const styles = theme => ({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
  },
  form: {
    width: '100%'
  },
  messageInput: {
    flex: 1,
    marginTop: theme.spacing.unit / 2
  },
  sendButton: {
    marginLeft: theme.spacing.unit
  },
  sendButtonContainer: {
    width: 'auto'
  }
})

export class MessageForm extends Component {
  static propTypes = {
    contactId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    sendMessage: PropTypes.func.isRequired,
    socket: PropTypes.shape({
      emit: PropTypes.func.isRequired
    }).isRequired
  }

  state = {
    text: ''
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleKeyDown = event => {
    if (event.key !== 'Enter' || event.shiftKey) {
      this.handleTyping()
      return
    }

    event.preventDefault()
    this.sendMessage()
  }

  handleSubmit = event => {
    event.preventDefault()

    this.sendMessage()
  }

  handleTyping = () => {
    if (!this.typing) {
      const { socket } = this.props

      this.typing = true
      socket.emit(TYPING)
    }

    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.handleStopTyping, 2000)
  }

  handleStopTyping = () => {
    const { socket } = this.props

    this.typing = false
    socket.emit(STOP_TYPING)
  }

  sendMessage = () => {
    const { text } = this.state

    if (!text) return

    const { contactId, sendMessage, socket } = this.props

    sendMessage(socket, {
      content: text,
      receiverId: contactId
    })

    this.setState({
      text: ''
    })
  }

  render() {
    const { classes, disabled } = this.props
    const { text } = this.state

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <Grid className={classes.container} container>
          <TextField
            className={classes.messageInput}
            data-testid="form-input"
            disabled={disabled}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder={'Type a message'}
            rowsMax={5}
            value={text}
            fullWidth
            multiline
          />

          <Grid
            className={classes.sendButtonContainer}
            direction="column"
            justify="flex-end"
            container
          >
            <IconButton
              className={classes.sendButton}
              data-testid="form-button"
              disabled={disabled}
              type="submit"
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendMessage: (socket, message) => dispatch(sendMessage(socket, message))
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MessageForm))
