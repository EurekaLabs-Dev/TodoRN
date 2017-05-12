import React from 'react'
import { ScrollView, Text, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import TodoInput from '../Components/TodoInput'
import TodoList from '../Components/TodoList'
import api from '../Services/FixtureApi'
import TodoActions from '../Redux/TodoRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'


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
    nomeCerveja: '',
    error: null
  }

  salvarCerveja() {
    const cerveja = {
      id: Date.now(),
      nome: this.state.nomeCerveja
    }
    AsyncStorage.setItem('cerveja', JSON.stringify(cerveja))
    NavigationActions.cervejaSalva({cerveja})
  }

  handleTextChange = text =>
    this.setState({ nomeCerveja: text })

  render () {
    return (
      <ScrollView style={[styles.container, {paddingTop: 50}]}>
        <TodoInput
          value={this.state.nomeCerveja}
          onSave={() => this.salvarCerveja()}
          onChange={this.handleTextChange}/>
        <ErrorMessage msg={this.state.errorMessage}/>
      </ScrollView>
    )
  }

}

export default connect(null, mapDispatchToProps)(Todo)
