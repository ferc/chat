import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
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

    if (moment().diff(readDate) < (20 * 1000)) return 'online'

    if (readDate) return `last seen ${moment(readDate).fromNow()}`

    return null
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