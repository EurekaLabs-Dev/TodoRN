import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'


export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
    alignItems: 'center'
  },
  list: {
    width: Metrics.screenWidth * 0.8
  }
})
