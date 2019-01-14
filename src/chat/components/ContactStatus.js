import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { NAME } from '../constants'

class ContactStatus extends Component {
  state = {
    now: new Date().getTime()
  }

  componentDidMount() {
    this.onlineIntervalId = setInterval(() => {
      this.setState({
        now: new Date().getTime()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.onlineIntervalId)
  }

  getLabel = () => {
    const { contactIsTyping, readDate } = this.props
    if (contactIsTyping) return 'is typing...'

    const isOnline = this.isOnline(readDate)
    if (isOnline) return 'online'

    return null
  }

  isOnline = readDate => {
    const { now } = this.state
    const readTime = new Date(readDate).getTime()

    return (now - readTime) < (20 * 1000)
  }

  render() {
    const label = this.getLabel()

    if (!label) return null

    return (
      <Typography variant="body1">
        {label}
      </Typography>
    )
  }
}

const mapStateToProps = state => ({
  contactIsTyping: state[NAME].contactIsTyping
})

export default connect(
  mapStateToProps,
)(ContactStatus)