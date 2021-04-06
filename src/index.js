import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import 'normalize.css';

import './index.css';
import App from './App';

const theme = {
  background: '#1E213F',
  backgroundControlBar: '#161932',
  activeColor: '#F87070',
  fontFamilyOne: "'Kumbh Sans', sans-serif",
  textColorOne: '#D7E0FF',
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
