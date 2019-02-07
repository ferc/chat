import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  image: {
    marginBottom: 8,
    width: 150
  },
  message: {
    flex: 1,
    marginRight: theme.spacing.unit * 2
  },
  received: {
    backgroundColor: '#ffffff'
  },
  sent: {
    backgroundColor: '#dcf8c6'
  },
  text: {
    whiteSpace: 'pre-line'
  },
  time: {
    marginRight: theme.spacing.unit / 2
  }
})

export class Message extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string,
    isCurrentUser: PropTypes.bool.isRequired,
    status: PropTypes.string
  }

  render() {
    const { classes, content, date, image, isCurrentUser, status } = this.props
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
            <Grid className={classes.message} direction="column" container>
              {image && <img className={classes.image} src={image} />}

              <Typography className={classes.text} data-testid="message-content" variant="body1">
                {content}
              </Typography>
            </Grid>

            <Grid item>
              <Grid alignItems="flex-end" container>
                <Typography className={classes.time} data-testid="message-time" variant="caption">
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