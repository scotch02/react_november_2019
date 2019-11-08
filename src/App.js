// core
import React from 'react';

// style
import logo from './logo.svg';
import './App.css';

// components
import ListController from './components/ListController/ListController'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ListController />
    </div>
  );
}

export default App;
