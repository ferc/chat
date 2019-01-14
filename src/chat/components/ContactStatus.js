import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import { NAME } from '../constants'

export class ContactStatus extends Component {
  static defaultProps = {
    classes: {}
  }

  static propTypes = {
    contactIsTyping: PropTypes.bool,
    readDate: PropTypes.string
  }

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

    if (!readDate) return null

    if (moment().diff(readDate) < (20 * 1000)) return 'online'

    return `last seen ${moment(readDate).fromNow()}`
  }

  render() {
    const { classes } = this.props
    const label = this.getLabel()

    if (!label) return null

    return (
      <Typography className={classes.text} variant="body1">
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