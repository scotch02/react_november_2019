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

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducer from './engine/reducers'


const store = createStore(combinedReducer);

export default function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" >All todos</Link>
            </li>
{/*             <li>
            <Link to="/done" >Done todos</Link>
            </li>
            <li>
              <Link to="/notdone" >Not done todos</Link>
            </li>
 */}          </ul>
        </nav>

        <Switch>
{/*           <Route path="/notdone">
            <TodoList key={ "notdone" } filter={{ field: "isDone", value: false }} />
          </Route>          
          <Route path="/done">
            <TodoList key={ "done" } filter={{ field: "isDone", value: true }} />
          </Route>
 */}          <Route path="/">
            <TodoList key={ "all" } />
          </Route>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}
