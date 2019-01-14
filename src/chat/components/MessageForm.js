import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'
import { sendMessage } from '../actions'

const styles = theme => ({
  container: {
    backgroundColor: 'white',
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

class Conversation extends Component {
  state = {
    text: ''
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleKeyDown = event => {
    if (event.key !== 'Enter' || event.shiftKey) return

    event.preventDefault()
    this.sendMessage()
  }

  handleSubmit = event => {
    event.preventDefault()

    this.sendMessage()
  }

  sendMessage = () => {
    const { contactId, sendMessage, userId } = this.props
    const { text } = this.state

    if (!text) return

    sendMessage(contactId, text, userId)

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
            <IconButton className={classes.sendButton} disabled={disabled} type="submit">
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendMessage: (userId, content, senderId) => dispatch(sendMessage(userId, content, senderId))
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Conversation))
