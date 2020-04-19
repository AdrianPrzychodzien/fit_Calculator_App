import * as React from 'react'
import { Provider } from 'react-redux'
import store from './redux-toolkit/redux-toolkit'
import { PersistGate } from 'redux-persist/integration/react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons'

import { PagesDrawer, HomeDrawer, WeightTrackerDrawer } from './navigation/Drawer'

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: route.name === 'Home'
              ? "Home" : route.name === 'Pages'
                ? 'Pages' : 'WeightTracker',
            tabBarIcon: ({ focused, tintColor }) => {
              if (route.name === 'Home') {
                return (
                  <Icon name='ios-home' size={30} />
                )
              } else if (route.name === 'Pages') {
                return (
                  <Icon name='ios-list' size={30} />
                )
              } else if (route.name === 'WeightTracker') {
                return (
                  <Icon name='ios-stats' size={30} />
                )
              }
            }
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Pages" component={PagesDrawer} />
          <Tab.Screen name="Home" component={HomeDrawer} />
          <Tab.Screen name="WeightTracker" component={WeightTrackerDrawer} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  )
}

export default App