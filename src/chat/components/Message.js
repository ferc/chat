import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import MessageIcon from './MessageIcon'

const styles = theme => ({
  container: {
    borderRadius: 4,
    marginTop: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    maxWidth: '70%',
    width: 'auto'
  },
  received: {
    backgroundColor: '#ffffff'
  },
  sent: {
    backgroundColor: '#dcf8c6'
  },
  text: {
    flex: 1,
    fontWeight: 400,
    marginRight: theme.spacing.unit * 2,
    whiteSpace: 'pre-line'
  },
  time: {
    marginRight: theme.spacing.unit / 2
  }
})

class Message extends Component {
  render() {
    const { classes, content, date, isCurrentUser, status } = this.props
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
              {content}
            </Typography>

            <Grid item>
              <Grid alignItems="flex-end" container>
                <Typography className={classes.time} variant="caption">
                  {moment(date).format('HH:mm')}
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