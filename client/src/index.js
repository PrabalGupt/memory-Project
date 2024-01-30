// place for initializing redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css'
import App from './App.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
// createStore
const store = configureStore({ reducer: reducers }, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <GoogleOAuthProvider clientId='348170096697-kr430vlmp4noe01d81kind40t7ml036d.apps.googleusercontent.com'>
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);