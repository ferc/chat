import React from 'react'
import cx from 'classnames'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

import messageStatus from '../enums/messageStatus'

const styles = theme => ({
  delivered: {
    color: grey['500']
  },
  error: {
    color: red['300']
  },
  icon: {
    fontSize: 14
  },
  read: {
    color: blue['400']
  },
  sending: {
    color: grey['500']
  },
  sent: {
    color: grey['500']
  }
})

const MessageIcon = ({ classes, status }) => {
  switch (status) {
    case messageStatus.delivered:
      return <DoneAllIcon className={cx(classes.icon, classes.delivered)} />
    case messageStatus.error:
      return <ErrorOutlineIcon className={cx(classes.icon, classes.error)} />
    case messageStatus.read:
      return <DoneAllIcon className={cx(classes.icon, classes.read)} />
    case messageStatus.sending:
      return <AccessTimeIcon className={cx(classes.icon, classes.sending)} />
    case messageStatus.sent:
      return <DoneIcon className={cx(classes.icon, classes.sent)} />
    default:
      return null
  }
}

export default withStyles(styles)(MessageIcon)