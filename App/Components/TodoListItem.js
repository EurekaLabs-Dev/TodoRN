import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/TodoListItemStyle'
import RoundedButton from './RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'

function Checkbox ({checked, onPress}) {
  const icon = checked ? 'check-square-o' : 'square-o' 
  const color = checked ? 'green': 'grey'

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.iconContainer} >
      <Icon 
        size={24} 
        color={color} 
        name={icon}/>
    </TouchableOpacity>
  )
}

export default function TodoListItem({todo, onToggle, onPress, onLongPress}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.text}>
        <Text>{todo.text}</Text>
      </TouchableOpacity>
      <Checkbox 
        checked={todo.done}
        onPress={onToggle}/>
    </View>
  )
}
