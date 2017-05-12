import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import TodoSemReduxScreen from '../Containers/TodoSemReduxScreen.js'
import CervejaScreen from '../Containers/CervejaScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='novaCerveja' component={TodoSemReduxScreen} title='Cerveja Salva' />
            <Scene key='cervejaSalva' component={CervejaScreen} title='Nova Cerveja' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
