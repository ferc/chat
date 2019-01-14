import React, { Component } from 'react'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Chat }  from './chat'
import setupStore from './setupStore'
import theme from './theme'

const mockProps = {
  contacts: [{
    avatar: null,
    id: 'd94b8c66-7de0-4403-b4df-ed469864c771',
    lastMessage: 'Bye!',
    name: 'Rob',
  }],
  contactSelected: {
    avatar: null,
    id: 'd94b8c66-7de0-4403-b4df-ed469864c771',
    lastMessage: 'Bye!',
    name: 'Rob',
  },
  contactSelectedId: 'd94b8c66-7de0-4403-b4df-ed469864c771',
  user: {
    avatar: null,
    id: '622e2331-5a61-4164-a831-61813134fd43',
    name: 'Laura'
  }
}

const store = setupStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline>
          <MuiThemeProvider theme={theme}>
            <Chat {...mockProps} />
          </MuiThemeProvider>
        </CssBaseline>
      </Provider>
    )
  }
}

export default App
