import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
  palette: {
    primary: grey
  },
  typography: {
    suppressWarning: true
  }
})

export default theme