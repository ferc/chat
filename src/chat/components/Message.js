import React, { Component } from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

class Message extends Component {
  render() {
    const { date, isCurrentUser, message } = this.props
    const justify = isCurrentUser ? 'flex-end' : 'flex-start'

    return (
      <Grid alignItems="flex-end" justify={justify} container>
        <Typography variant="body2" gutterBottom>
          {message}
        </Typography>

        <Typography variant="caption" gutterBottom>
          {moment(date).format('hh:mm')}
        </Typography>
      </Grid>
    )
  }
}

export default Message