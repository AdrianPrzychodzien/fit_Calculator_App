import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/Ionicons'

import Home from './screens/Home'
import PersonalData from './screens/PersonalData'
import BodyFat from './screens/BodyFat'


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: route.name === 'Home' ? "Home" : 'PersonalData',
            tabBarIcon: ({ focused, tintColor }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'PersonalData') {
                iconName = focused ? 'ios-add' : 'ios-add';
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
          <Tab.Screen name="List" component={DrawerNav} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="PersonalData" component={PersonalData} />
        </Tab.Navigator>

      </NavigationContainer>
    </>
  );
}

const DrawerNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="BodyFat" component={BodyFat} />
        <Drawer.Screen name="PersonalData" component={PersonalData} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}