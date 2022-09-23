import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//  AWS Amplify related
import "@aws-amplify/ui-react/styles.css";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@aws-amplify/ui-react";
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config)

const theme = {
  name: 'howto-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: 'white' }
      }
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '{colors.blue.60}' },
          _hover: {
            backgroundColor: { value: '{colors.blue.80}' }
          },
          _focus: {
            backgroundColor: { value: '{colors.blue.80}' }
          },
          _active: {
            backgroundColor: { value: '{colors.blue.90}' }
          }
        },
        link: {
          color: { value: '{colors.blue.90}' },
          _active: { color: { value: '{colors.blue.90}' }},
          _focus: { color: { value: '{colors.blue.40}' }},
          _hover: { color: { value: '{colors.blue.60}' }},
          _visited: { color: { value: '{colors.blue.90}' }}
        } 
      }
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AmplifyProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AmplifyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
