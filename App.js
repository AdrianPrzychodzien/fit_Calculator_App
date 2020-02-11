import * as React from 'react'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/Ionicons'
import Colors from './utils/Colors'

import Home from './screens/Home'
import PersonalData from './screens/PersonalData'
import BodyFat from './screens/BodyFat'
import WeightTracker from './screens/WeightTracker'
import Bmi from './screens/Bmi'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
            <Tab.Screen name="Pages" component={PersonalDataDrawer} />
            <Tab.Screen name="Home" component={HomeDrawer} />
            <Tab.Screen name="WeightTracker" component={WeightTrackerDrawer} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const PersonalDataDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="PersonalData">
      <Drawer.Screen name="PersonalData" component={PersonalDataStack} />
      <Drawer.Screen name="BodyFat" component={BodyFatStack} />
      <Drawer.Screen name="Bmi" component={BmiStack} />
    </Drawer.Navigator>
  )
}

const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  )
}

const WeightTrackerDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="WeightTracker">
      <Drawer.Screen name="WeightTracker" component={WeightTrackerStack} />
    </Drawer.Navigator>
  )
}

const HomeStack = ({ navigation }) => {
  return (
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
}

const WeightTrackerStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: Colors.primary },
        headerTitleStyle: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }
      }}
    >
      <Stack.Screen name="Weight Tracker" component={WeightTracker}
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
}

const PersonalDataStack = ({ navigation }) => {
  return (
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
}

const BodyFatStack = ({ navigation }) => {
  return (
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
}

const BmiStack = ({ navigation }) => {
  return (
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
}

export default App