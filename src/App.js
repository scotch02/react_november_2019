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

import SimpleBottomNavigation from './components/SimpleBottomNavigation/SimpleBottomNavigation'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const store = createStore(
  combinedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const LinkAll = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/" {...props} />
));

const LinkDone = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/done" {...props} />
));

const LinkNotDone = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/notdone" {...props} />
));


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Tabs>
            <Tab label="All todos" component={LinkAll} />
            <Tab label="Done todos" component={LinkDone} />
            <Tab label="Not done todos" component={LinkNotDone} />
          </Tabs>
        </AppBar>

        <Switch>
          <Route path="/notdone">
            <TodoList key={"notdone"} filter={{ field: "isDone", value: false }} />
          </Route>
          <Route path="/done">
            <TodoList key={"done"} filter={{ field: "isDone", value: true }} />
          </Route>
          <Route path="/">
            <TodoList key={"all"} />
          </Route>
        </Switch>
      </Router>


      <SimpleBottomNavigation />
    </Provider>
  );
}