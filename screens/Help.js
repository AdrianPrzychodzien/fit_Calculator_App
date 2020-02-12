import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { AccordionList } from "accordion-collapse-react-native"
import { Separator } from 'native-base'

const Help = ({ }) => {
  let list = [
    {
      id: 1,
      title: 'Resting Metabolic Rate',
      body: '...is the total number of calories burned when your body is completely at rest. RMR supports breathing, circulating blood, organ functions, and basic neurological functions. It is proportional to lean body mass and decreases approximately 0.01 kcal/min for each 1% increase in body fatness.'
    },
    {
      id: 2,
      title: 'Maximum Heart Rate',
      body: '...the age-related number of beats per minute of the heart when working at its maximum that is usually estimated as 220 minus one`\s age reached 90 percent of his maximum heart rate when tested on a treadmill'
    },
    {
      id: 3,
      title: 'Training Heart Rate',
      body: '...heart rate training zone is a range that defines the upper and lower limits of training intensities. It is calculated using an age-related predicted maximum heart rate (HRmax) and a special equation called heart rate reserve. The range is based on metabolic systems in your body that fuel your muscles during exercise, and how hard you want to train. Training from 40% to 85% of HRmax is aerobic exercise ("cardio"). Aerobic means "with oxygen." Training above 85% of HRmax is anaerobic exercise. Anaerobic means "without oxygen".'
    },
    {
      id: 4,
      title: 'Body Fat Percentage',
      body: '...your body fat percentage refers to the amount of fat present in your body as a percentage. It includes both essential fat and storage fat. Essential body fat is found in your nerves, bone marrow and organs and cannot be lost without negative side effects. The storage body fat accumulates when excess energy or calories are consumed - this is the type of fat you can safely reduce to either lose weight or lower your body fat percentage. The U.S. Navy has devised a method to calculate your body fat percentage. It uses just a few measurements and a little math to come up with a value that can give you some insight in your health and weight.'
    },
    {
      id: 5,
      title: 'Body measurements',
      body: '1. Measure your height while not wearing shoes. Stand straight, head erect and eyes looking forward.     2. Measure your waist. Use the circumference of your waist at a horizontal level around the navel for men, and at the level with the least width for women. Your arms should be relaxed by your side. Don`\tt pull or suck in your stomach. Try to relax and measure as you`\rre exhaling to get the most accurate measurement.     3. Measure your neck. Start below the larynx (Adam`\s apple) with the tape  measure perpendicular to the long axis of the neck. Try to keep you head straight and look forward. Avoid flaring your neck out. Make sure your shoulders are down and relaxed, not hunched.    4. Measure your hips. Place the tape measure around the largest width of your hips. If wearing clothes, pull the tape measure somewhat taught to account for the bulk of your clothing.'
    }
  ]

  const head = item => {
    return (
      <Separator bordered style={styles.separator}>
        <Text style={styles.title}>{item.title}</Text>
      </Separator>
    )
  }

  const body = item => {
    return (
      <View style={{ padding: 15 }}>
        <Text style={styles.text}>{item.body}</Text>
      </View>
    )
  }

  return (
    <AccordionList
      list={list}
      header={head}
      body={body}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  title: {
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
  }
})

export default Help