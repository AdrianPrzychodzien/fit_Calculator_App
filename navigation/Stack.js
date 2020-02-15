import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import PersonalData from '../screens/PersonalData'
import BodyFat from '../screens/BodyFat'
import WeightTracker from '../screens/WeightTracker'
import Bmi from '../screens/Bmi'
import DietsNavigator from '../navigation/DietsNavigator'
import WeightTrackerNavigator from './WeightTrackerNavigator'
import Help from '../screens/Help'

import Colors from '../utils/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator()

export const HomeStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="fit-Calculator" component={Home}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />)
      }}
    />
  </Stack.Navigator>
)

export const WeightTrackerStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="WeightTracker" component={WeightTracker}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />)
      }}
    />
  </Stack.Navigator>
)

export const PersonalDataStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="Personal Data" component={PersonalData}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
            onPress={navigation.toggleDrawer}
          />
        )
      }}
    />
  </Stack.Navigator>
)


export const BodyFatStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="Body Fat %" component={BodyFat}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
            onPress={navigation.toggleDrawer}
          />
        )
      }}
    />
  </Stack.Navigator>
)

export const BmiStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="Body Mass Index" component={Bmi}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
            onPress={navigation.toggleDrawer}
          />
        )
      }}
    />
  </Stack.Navigator>
)

export const DietsStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="Diets" component={DietsNavigator}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
            onPress={navigation.toggleDrawer}
          />
        )
      }}
    />
  </Stack.Navigator>
)

export const WeightTrackerNavigatorStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="Weight Statistics" component={WeightTrackerNavigator}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
            onPress={navigation.toggleDrawer}
          />
        )
      }}
    />
  </Stack.Navigator>
)

export const HelpStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen name="Help Page" component={Help}
      options={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
            onPress={navigation.toggleDrawer}
          />
        )
      }}
    />
  </Stack.Navigator>
)