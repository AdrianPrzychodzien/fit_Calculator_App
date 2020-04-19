import React from 'react';

import Maintenance from '../components/Diets/Maintenance';
import Cutting from '../components/Diets/Cutting';
import Bulking from '../components/Diets/Bulking';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

type DietsParamList = {
  Maintenance: undefined;
  Cutting: undefined;
  Bulking: undefined;
};

const Tab = createMaterialTopTabNavigator<DietsParamList>();

const DietsNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Maintenance' component={Maintenance} />
      <Tab.Screen name='Cutting' component={Cutting} />
      <Tab.Screen name='Bulking' component={Bulking} />
    </Tab.Navigator>
  );
};

export default DietsNavigator;
