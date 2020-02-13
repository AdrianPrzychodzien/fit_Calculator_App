import React from 'react'

import History from '../components/WeightStats/History'
import Statistics from '../components/WeightStats/Statistics'
import Chart from '../components/WeightStats/Chart'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

const WeightTrackerNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="Chart" component={Chart} />
    </Tab.Navigator>
  )
}

export default WeightTrackerNavigator