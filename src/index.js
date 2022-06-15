import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './app/index.css';
import App from './app/App';
import store from './redux/redux-store';
import { Provider } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback="Loading...">
        <App dispatch={store.dispatch.bind(store)} store={store} />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

