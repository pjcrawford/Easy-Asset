  
import React from 'react';
import './../App.css';

const AppHeader = (props) => {
  return(
    <header className="app-header">
      <h1 className="app-title"> 
        <a className="phone-title"> Welcome to Easy Asset </a>
      </h1>
      <menu className="main-menu">
      </menu>
    </header>
  )
}

export default AppHeader