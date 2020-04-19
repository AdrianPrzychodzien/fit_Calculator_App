import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import PersonalData from '../screens/PersonalData';
import BodyFat from '../screens/BodyFat';
import WeightTracker from '../screens/WeightTracker';
import Bmi from '../screens/Bmi';
import DietsNavigator from './DietsNavigator';
import WeightTrackerNavigator from './WeightTrackerNavigator';
import Help from '../screens/Help';

import Colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: any;
};

type StackNavigatorParamList = {
  'Personal Data': undefined;
  'Body Fat Percentage': undefined;
  'Body Mass Index': undefined;
  Diets: undefined;
  'Weight Statistics': undefined;
  Help: undefined;
  Home: undefined;
  WeightTracker: undefined;
  'fit-Calculator': undefined;
  'Body Fat %': undefined;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

export const HomeStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='fit-Calculator'
      component={Home}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const WeightTrackerStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='WeightTracker'
      component={WeightTracker}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const PersonalDataStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='Personal Data'
      component={PersonalData}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        ),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const BodyFatStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='Body Fat %'
      component={BodyFat}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        ),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const BmiStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='Body Mass Index'
      component={Bmi}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        ),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const DietsStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='Diets'
      component={DietsNavigator}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        ),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const WeightTrackerNavigatorStack: React.FC<Props> = ({
  navigation
}) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='Weight Statistics'
      component={WeightTrackerNavigator}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        ),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    />
  </Stack.Navigator>
);

export const HelpStack: React.FC<Props> = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { fontSize: 26, letterSpacing: 1.1 }
    }}
  >
    <Stack.Screen
      name='Help'
      component={Help}
      options={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name='ios-backspace'
            style={{ color: 'white', marginLeft: 20 }}
            size={35}
            onPress={navigation.goBack}
          />
        ),
        headerRight: () => (
          <Icon
            name='ios-list'
            style={{ color: 'white', marginRight: 20 }}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    />
  </Stack.Navigator>
);
