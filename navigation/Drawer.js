import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import {
  HomeStack,
  WeightTrackerStack,
  WeightTrackerNavigatorStack,
  PersonalDataStack,
  BodyFatStack,
  BmiStack,
  DietsStack,
  HelpStack
} from './Stack'

const Drawer = createDrawerNavigator()

export const PagesDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Personal Data" component={PersonalDataStack} />
      <Drawer.Screen name="Body Fat Percentage" component={BodyFatStack} />
      <Drawer.Screen name="Body Mass Index" component={BmiStack} />
      <Drawer.Screen name="Diets" component={DietsStack} />
      <Drawer.Screen name="Weight Statistics" component={WeightTrackerNavigatorStack} />
      <Drawer.Screen name="Help" component={HelpStack} />
    </Drawer.Navigator>
  )
}

export const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  )
}

export const WeightTrackerDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="WeightTracker">
      <Drawer.Screen name="WeightTracker" component={WeightTrackerStack} />
    </Drawer.Navigator>
  )
}