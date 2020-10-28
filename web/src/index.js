import React from 'react';
import ReactDOM from 'react-dom';
import 'mobx-react-lite/batchingForReactDom'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: "#000000", // black
    },
    secondary: {
      main: "#262626", // lighter dark grey
    },
    error: {
      main: "#e90029", // red
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,    
  },
  overrides: {
    MuiButton: { // override the styles of all instances of this component
        root: { // Name of the rule
            color: 'white', // Some CSS
        },
    },
  }  
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
