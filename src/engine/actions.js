/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const LOAD_INITIAL_TODO_LIST = 'LOAD_INITIAL_TODO_LIST';

/*
 * action creators
 */

export function addTodo(todo) {
  return { 
    type: ADD_TODO, 
    payload: todo
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id
  }
}

export function updateTodo(mutatedTodo) {
  return {
    type: UPDATE_TODO,
    payload: mutatedTodo
  }
}

export function loadInitialTodoList(newTodoArray) {
  return {
    type: LOAD_INITIAL_TODO_LIST,
    payload: newTodoArray
  }
}