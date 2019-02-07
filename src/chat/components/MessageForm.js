import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import SendIcon from '@material-ui/icons/Send'
import { sendMessage } from '../actions'
import { STOP_TYPING, TYPING } from '../eventNames'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit
  },
  buttonContainer: {
    width: 'auto'
  },
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
  imagePreview: {
    height: 48,
    marginLeft: 8,
    marginRight: 8,
    width: 48
  },
  messageInput: {
    flex: 1,
    marginTop: theme.spacing.unit / 2
  },
  uploadInput: {
    display: 'none'
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
    image: null,
    text: ''
  }

  uploadInputRef = React.createRef()

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  handleAddImage = event => {
    this.uploadInputRef.current.click()
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleImageChange = async event => {
    if (!event.target.files.length) {
      this.setState({
        image: null
      })

      return
    }

    const imageFile = event.target.files[0]
    const image = await this.imageFileToBase64(imageFile)

    this.setState({
      image
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

  imageFileToBase64 = file => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
      fileReader.onload = () => resolve(fileReader.result)
      fileReader.onerror = error => reject(error)
    })
  }

  sendMessage = () => {
    const { image, text } = this.state

    if (!image && !text) return

    const { contactId, sendMessage, socket } = this.props

    sendMessage(socket, {
      content: text,
      image,
      receiverId: contactId
    })

    this.setState({
      image: null,
      text: ''
    })
  }

  render() {
    const { classes, disabled } = this.props
    const { image, text } = this.state

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

          {image && <img className={classes.imagePreview} src={image} />}

          <Grid
            className={classes.buttonContainer}
            direction="column"
            justify="flex-end"
            container
          >
            <IconButton
              className={classes.button}
              data-testid="form-add-image-button"
              disabled={disabled}
              onClick={this.handleAddImage}
              type="button"
            >
              <PhotoCameraIcon />
            </IconButton>

            <input
              className={classes.uploadInput}
              onChange={this.handleImageChange}
              ref={this.uploadInputRef}
              type="file"
            />
          </Grid>

          <Grid
            className={classes.buttonContainer}
            direction="column"
            justify="flex-end"
            container
          >
            <IconButton
              className={classes.button}
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
