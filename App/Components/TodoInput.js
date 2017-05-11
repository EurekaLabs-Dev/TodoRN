import React, {PropTypes} from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/TodoInputStyle'
import RoundedButton from './RoundedButton'

TodoInput.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string
  }),
  onSave: PropTypes.func
}

export default function TodoInput({value, onSave, onChange}) {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder='Fazer ...'
        onChangeText={text => onChange(text)}
        value={value} />
      <RoundedButton 
        text='Salvar'
        containerStyle={styles.button}
        onPress={onSave}/>
    </View>
  )
}
