import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import api from '../Services/FixtureApi'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createTodoRequest: (todo) => (dispatch) => {
    console.log(todo)
    dispatch({type: 'CREATE_TODO_REQUEST', todo})
    api.createTodo(todo)
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
    todos: state.todos.filter(t => t.id !== todo.id).concat(todo)
  })
}

// Something went wrong somewhere.
export const deuErrado = (state, {error}) =>
  state.merge({ fetching: false, errorMessage: error.message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  CREATE_TODO_REQUEST: fazendoRequest,
  CREATE_TODO_SUCCESS: deuCertoCriar,
  CREATE_TODO_ERROR: deuErrado,
  LOGOUT: () => INITIAL_STATE,
  [Types.LIMPAR_TODOS]: () => INITIAL_STATE
})
