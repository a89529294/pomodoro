import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/useThemeStore';

ReactDOM.render(
  <ThemeProvider>
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
