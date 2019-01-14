import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { Chat }  from './chat'
import setupStore from './setupStore'

const styles = theme => ({
  chat: {
    minHeight: 300,
    height: '100%',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      height: '50%'
    }
  },
  container: {
    backgroundColor: '#f2f2f2',
    backgroundImage: 'linear-gradient(to bottom, #dddbd1, #d2dbdc)',
    height: '100%'
  }
})

const lauraMockProps = {
  contactSelected: {
    id: 'd94b8c66-7de0-4403-b4df-ed469864c771',
    name: 'Rob',
  },
  user: {
    id: '622e2331-5a61-4164-a831-61813134fd43',
    name: 'Laura'
  }
}

const robMockProps = {
  contactSelected: {
    id: '622e2331-5a61-4164-a831-61813134fd43',
    name: 'Laura'
  },
  user: {
    id: 'd94b8c66-7de0-4403-b4df-ed469864c771',
    name: 'Rob',
  }
}

class Conversation extends Component {
  render() {
    const { classes } = this.props

    return (
      <Grid className={classes.container} container>
        <Grid className={classes.chat} sm={6} xs={12} item>
          <Provider store={setupStore()}>
            <Chat {...lauraMockProps} />
          </Provider>
        </Grid>

        <Grid className={classes.chat} sm={6} xs={12} item>
          <Provider store={setupStore()}>
            <Chat {...robMockProps} />
          </Provider>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Conversation)
