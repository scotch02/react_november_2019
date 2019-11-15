// core
import React from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// style
import 'typeface-roboto';
import './App.css';


// components
import TodoList from './components/TodoList/TodoList';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All todos</Link>
            </li>
            <li>
            <Link to="/done" >Done todos</Link>
            </li>
            <li>
              <Link to="/notdone">Not done todos</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/notdone">
            <NotDone />
            {/*<TodoList filter={{ field: "isDone", value: false }} />*/}
          </Route>          
          <Route path="/done">
            <Done />
            {/*<TodoList filter={{ field: "isDone", value: true }} />*/}
          </Route>
          <Route path="/">
            <All />
            {/*<TodoList />*/}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function All() {
  return <TodoList />;
}

function Done() {
  return <TodoList filter={{ field: "isDone", value: true }} />;
}

function NotDone() {
  return <TodoList filter={{ field: "isDone", value: false }} />;
}


export default App;
