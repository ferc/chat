import React, { Component } from 'react'
import cx from 'classnames'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'

import messageStatus from '../enums/messageStatus'

const styles = theme => ({
  delivered: {
    color: grey['500']
  },
  icon: {
    fontSize: 14
  },
  read: {
    color: blue['400']
  },
  sent: {
    color: grey['500']
  }
})

const MessageIcon = ({ classes, status }) => {
  switch (status) {
    case messageStatus.delivered:
      return <DoneAllIcon className={cx(classes.icon, classes.delivered)} />
    case messageStatus.read:
      return <DoneAllIcon className={cx(classes.icon, classes.read)} />
    case messageStatus.sent:
      return <DoneIcon className={cx(classes.icon, classes.sent)} />
    default:
      return null
  }
}

export default withStyles(styles)(MessageIcon)