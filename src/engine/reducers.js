import { combineReducers } from 'redux'
import {
  ADD_TODO
} from './actions'


function todoReducer(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    summary: action.payload.text,
                    isDone: false
                }
            ]
        default:
            return state
    }
}

const combinedReducer = combineReducers({
    todoReducer: todoReducer
})

export default combinedReducer