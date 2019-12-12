import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadState, saveState } from './localStorage'

const persisitedState = loadState();
const store = createStore(

)

ReactDOM.render(<App />, document.getElementById('root'));