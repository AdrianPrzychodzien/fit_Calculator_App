import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { HomeStack, WeightTrackerStack, PersonalDataStack, BodyFatStack, BmiStack, CaloriesStack, HelpStack } from './Stack'

const Drawer = createDrawerNavigator()

export const PagesDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="PersonalData" component={PersonalDataStack} />
      <Drawer.Screen name="BodyFat" component={BodyFatStack} />
      <Drawer.Screen name="Bmi" component={BmiStack} />
      <Drawer.Screen name="Calories" component={CaloriesStack} />
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