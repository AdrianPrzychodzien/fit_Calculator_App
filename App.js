import * as React from 'react';

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/Ionicons'

import Home from './screens/Home'
import PersonalData from './screens/PersonalData'
import BodyFat from './screens/BodyFat'
import WeightTracker from './screens/WeightTracker'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarLabel: route.name === 'Home'
                ? "Home" : route.name === 'PersonalData'
                  ? 'PersonalData' : 'WeightTracker',
              tabBarIcon: ({ focused, tintColor }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-home'
                    : 'ios-home';
                } else if (route.name === 'PersonalData') {
                  iconName = focused ? 'ios-add' : 'ios-add';
                } else if (route.name === 'WeightTracker') {
                  iconName = focused ? 'ios-stats' : 'ios-stats'
                }
                return (
                  <Icon name={iconName} size={30} />
                )
              }
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="PersonalData" component={PersonalData} />
            <Tab.Screen name="WeightTracker" component={WeightTracker} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}




const SideDrawer = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="PersonalData" component={PersonalData} />
        <Drawer.Screen name="BodyFat" component={BodyFat} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}