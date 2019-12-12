import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { loadState, saveState } from './localStorage'

// const persisitedState = loadState();
// const store = createStore(
//     App,
//     persisitedState
// );

// //adding a listener that invoked on any state change
// store.subscribe(() => {
//     saveState(store.getState());
// });



ReactDOM.render(<App />, document.getElementById('root'));