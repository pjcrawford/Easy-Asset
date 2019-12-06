import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import promise from 'redux-promise'
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";


const storeWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(<App />, document.getElementById('root'));