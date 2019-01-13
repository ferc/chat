import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import SendIcon from '@material-ui/icons/Send'

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
    const { text } = this.state

    console.log('send', text)

    this.setState({
      text: ''
    })
  }

  render() {
    const { classes } = this.props
    const { text } = this.state

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <Grid className={classes.container} container>
          <TextField
            className={classes.messageInput}
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
            <IconButton className={classes.sendButton} type="submit">
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withStyles(styles)(Conversation)