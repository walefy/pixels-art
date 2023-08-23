import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ store }>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
);
