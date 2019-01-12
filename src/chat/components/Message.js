import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import MessageIcon from './MessageIcon'

const styles = theme => ({
  container: {
    borderRadius: 4,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    maxWidth: '70%',
    width: 'auto'
  },
  received: {
    backgroundColor: grey['100']
  },
  sent: {
    backgroundColor: green['100']
  },
  text: {
    flex: 1,
    fontWeight: 400,
    marginRight: theme.spacing.unit * 2
  },
  time: {
    marginRight: theme.spacing.unit / 2
  }
})

class Message extends Component {
  render() {
    const { classes, date, isCurrentUser, message, status } = this.props
    const justify = isCurrentUser ? 'flex-end' : 'flex-start'
    const containerClass = isCurrentUser ? classes.sent : classes.received

    return (
      <Grid justify={justify} container>
        <Grid
          alignItems="flex-end"
          className={cx(classes.container, containerClass)}
          container
        >
          <Grid alignItems="flex-end" direction="row" justify="space-between" container>
            <Typography className={classes.text} variant="body2">
              {message}
            </Typography>

            <Grid item>
              <Grid alignItems="flex-end" container>
                <Typography className={classes.time} variant="caption">
                  {moment(date).format('hh:mm')}
                </Typography>

                <MessageIcon status={status} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Message)