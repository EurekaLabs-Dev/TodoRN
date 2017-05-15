import React from 'react'
import { ScrollView, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import TodoInput from '../Components/TodoInput'
import TodoList from '../Components/TodoList'
import TodoActions from '../Redux/TodoRedux'

const mapDispatchToProps = (dispatch) => ({
  criarTodo: () => dispatch(TodoActions.createTodoRequest()),
  handleTodoChange: text => dispatch(TodoActions.changeCurrentTodo(text)),
  handleTodoSelect: todo => dispatch(TodoActions.selectTodo(todo)),
  removeTodo: todo => dispatch(TodoActions.removeTodo(todo)),
  toggleTodo: todo => dispatch(TodoActions.toggleTodo(todo))
})

const mapStateToProps = state => ({
  todos: state.todo.todos,
  currentTodo: state.todo.currentTodo,
})

// Styles
import styles from './Styles/TodoScreenStyle'

const ErrorMessage = ({msg}) => (
  <Text style={styles.errorMessage}>{msg}</Text>
)


class Todo extends React.Component {

  handleTodoChange = text => {
    this.props.handleTodoChange(text)
  }



  saveTodo = () => {
    this.props.criarTodo()
  }

  removeTodo = todo => {
    api.removeTodo(todo)
      .then(response => {
        this.setState({
          todos: this.state.todos.filter(t => t.id !== todo.id) })
      })
  }

  toggleTodo = todo => {
    console.log(todo)
    const toggledTodo = {...todo, done: !todo.done}
    this.saveTodo(toggledTodo)
  }

  render () {
    const {
      todos,
      currentTodo = {},
      errorMessage,
      handleTodoSelect,
      removeTodo,
      toggleTodo
    } = this.props

    return (
      <ScrollView style={styles.container}>
        <TodoInput
          value={currentTodo.text}
          onSave={this.saveTodo}
          onChange={this.handleTodoChange}/>
        <ErrorMessage msg={errorMessage}/>
        <TodoList
          todos={todos}
          onSelect={handleTodoSelect}
          onToggle={toggleTodo}
          onRemove={removeTodo}/>
      </ScrollView>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
