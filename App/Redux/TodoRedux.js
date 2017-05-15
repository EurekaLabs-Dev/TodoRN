import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import api from '../Services/FixtureApi'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeCurrentTodo: ['text'],
  selectTodo: ['todo'],
  toggleTodo: ['todo'],
  removeTodo: ['todo'],
  createTodoRequest: () => (dispatch, getState) => {
    const currentTodo = getState().todo.currentTodo
    dispatch({type: 'CREATE_TODO_REQUEST', todo: currentTodo })
    if(currentTodo.id)
      api.updateTodo(currentTodo)
        .then(response => {
          if (response.ok) {
            dispatch({
              type: 'CREATE_TODO_SUCCESS',
              todo: response.data
            })
            return;
          }

          dispatch({
            type: 'CREATE_TODO_ERROR',
            error: response.data
          })
      });
    else
      api.createTodo(currentTodo)
        .then(response => {
          if (response.ok) {
            dispatch({
              type: 'CREATE_TODO_SUCCESS',
              todo: response.data
            })
            return;
          }

          dispatch({
            type: 'CREATE_TODO_ERROR',
            error: response.data
          })
        })
  },
  limparTodos: null
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  todos: [],
  currentTodo: {},
  errorMessage: null
})

/* ------------- Reducers ------------- */


export const fazendoRequest = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const deuCertoCriar = (state, {todo}) => {
  return state.merge({
    fetching: false,
    currentTodo: {},
    todos: state.todos.filter(t => t.id !== todo.id).concat(todo)
  })
}

// Something went wrong somewhere.
export const deuErrado = (state, {error}) =>
  state.merge({ fetching: false, errorMessage: error.message })


export const changeCurrentTodo = (state, {text}) =>{
  const actualTodo = {...state.currentTodo, text}
  return state.merge({currentTodo:actualTodo})
}

export const selectTodo = (state, {todo}) => {
  return state.merge({currentTodo:todo})
}

export const removeTodo = (state, {todo}) => {
 const todosMenosAqueleLah = state.todos.filter(t => t.id !== todo.id)
  return state.merge({todos: todosMenosAqueleLah})
}

const toggleTodo = (state, {todo}) => {
  const todos = state.todos.map(t => {
    if (t.id === todo.id)
      return t.merge({done: !t.done})

    return t
  })
  return state.merge({ todos })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  CREATE_TODO_REQUEST: fazendoRequest,
  CREATE_TODO_SUCCESS: deuCertoCriar,
  CREATE_TODO_ERROR: deuErrado,
  LOGOUT: () => INITIAL_STATE,
  [Types.LIMPAR_TODOS]: () => INITIAL_STATE,
  [Types.CHANGE_CURRENT_TODO] : changeCurrentTodo,
  [Types.SELECT_TODO] : selectTodo,
  [Types.REMOVE_TODO]: removeTodo,
  [Types.TOGGLE_TODO]: toggleTodo
})
