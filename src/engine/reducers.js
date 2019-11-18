import { combineReducers } from 'redux'
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from './actions'


function todoReducer(state = [], action) {
    switch (action.type) {

        case ADD_TODO:
            return [
                ...state,
                action.payload
            ]

        case DELETE_TODO:
            return state.filter(item => item.id !== action.payload)

        case UPDATE_TODO:
            const items  = state;
            const idx = items.findIndex(item => item.id === action.payload.id);

            if(idx !== -1) {
                const newItems = [...items];
                newItems[idx] = action.payload;
                return  newItems
            } else {
                return state;
            }

        default:
            return state
    }
}

const combinedReducer = combineReducers({
    todos: todoReducer
})

export default combinedReducer