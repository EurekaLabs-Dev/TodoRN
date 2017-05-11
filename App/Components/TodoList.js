import React, {PropTypes} from 'react'
import { View, Text, ListView } from 'react-native'
import styles from './Styles/TodoListStyle'
import TodoListItem from './TodoListItem'

const rowHasChanged = (r1, r2) => r1 !== r2

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    onSelect: PropTypes.func,
    onToggle: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    dataSource: new ListView.DataSource({rowHasChanged})
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.todos)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todos === this.props.todos) return

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.todos)
    })
  }

  renderRow = item => (
    <TodoListItem
      todo={item}
      onPress={() => this.props.onSelect(item)}
      onLongPress={() => this.props.onRemove(item)}
      onToggle={() => this.props.onToggle(item)}/>
  )

  render () {
    return (
      <View style={styles.container}>
        <ListView 
          enableEmptySections
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}/>
      </View>
    )
  }
}
