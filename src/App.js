import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import SplitScreen  from './SplitScreen'
import theme from './theme'

class App extends Component {
  render() {
    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <SplitScreen />
        </MuiThemeProvider>
      </CssBaseline>
    )
  }
}

export default App
