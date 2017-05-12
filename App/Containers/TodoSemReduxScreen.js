import React from 'react'
import { ScrollView, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import TodoInput from '../Components/TodoInput'
import TodoList from '../Components/TodoList'
import api from '../Services/FixtureApi'
import TodoActions from '../Redux/TodoRedux'


const mapDispatchToProps = (dispatch) => ({
  criarTodo: todo => dispatch(TodoActions.createTodoRequest(todo))
})

// Styles
import styles from './Styles/TodoScreenStyle'

const ErrorMessage = ({msg}) => (
  <Text style={styles.errorMessage}>{msg}</Text>
)


class Todo extends React.Component {
  state = {
    todos: [],
    currentTodo: {},
    errorMessage: null
  }

  handleTodoChange = text => {
    this.setState({
      currentTodo: {
        ...this.state.currentTodo,
        text
      }
    })
  }

  onSaveTodo = response => {
    if (response.ok) {
      const newTodo = response.data
      this.setState({
        todos: this.state.todos.filter(t => t.id !== newTodo.id).concat(newTodo),
        currentTodo: {},
        errorMessage: null
      })
      return;
    }

    this.setState({
      errorMessage: response.data.message
    })
  }

  saveTodo = (todo) => this.props.criarTodo(todo)

  editTodo = todo => this.setState({currentTodo: todo})

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

  componentDidMount() {
    api.fetchTodos()
      .then(response => {
        if (response.ok) return this.setState({todos: response.data})
        Alert.alert('Aviso', 'Não foi possível buscar todos na api.')
      })
  }

  render () {
    const {currentTodo, todos } = this.state;

    return (
      <ScrollView style={styles.container}>
        <TodoInput
          value={currentTodo.text}
          onSave={() => this.saveTodo(currentTodo)}
          onChange={this.handleTodoChange}/>
        <ErrorMessage msg={this.state.errorMessage}/>
        <TodoList
          todos={todos}
          onSelect={this.editTodo}
          onToggle={this.toggleTodo}
          onRemove={this.removeTodo}/>
      </ScrollView>
    )
  }

}

export default connect(null, mapDispatchToProps)(Todo)
