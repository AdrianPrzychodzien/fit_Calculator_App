import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  HomeStack,
  WeightTrackerStack,
  WeightTrackerNavigatorStack,
  PersonalDataStack,
  BodyFatStack,
  BmiStack,
  DietsStack,
  HelpStack
} from './Stack';

type DrawerParamList = {
  'Personal Data': undefined;
  'Body Fat Percentage': undefined;
  'Body Mass Index': undefined;
  Diets: undefined;
  'Weight Statistics': undefined;
  Help: undefined;
  Home: undefined;
  WeightTracker: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const PagesDrawer: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Personal Data' component={PersonalDataStack} />
      <Drawer.Screen name='Body Fat Percentage' component={BodyFatStack} />
      <Drawer.Screen name='Body Mass Index' component={BmiStack} />
      <Drawer.Screen name='Diets' component={DietsStack} />
      <Drawer.Screen
        name='Weight Statistics'
        component={WeightTrackerNavigatorStack}
      />
      <Drawer.Screen name='Help' component={HelpStack} />
    </Drawer.Navigator>
  );
};

export const HomeDrawer: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name='Home' component={HomeStack} />
    </Drawer.Navigator>
  );
};

export const WeightTrackerDrawer: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName='WeightTracker'>
      <Drawer.Screen name='WeightTracker' component={WeightTrackerStack} />
    </Drawer.Navigator>
  );
};
