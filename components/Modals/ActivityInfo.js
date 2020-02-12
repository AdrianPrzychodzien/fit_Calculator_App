import React, { useState } from 'react'

import { View, ScrollView, Text, StyleSheet, Button, Modal } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'


const ActivityInfo = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const starIcon = <FontAwesomeIcon icon={faStar} size={24} style={{ color: '#c5a100c4' }} />

  return (
    <>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={globalStyles.container}>
          <View style={styles.modalCloseIcon}>
            <FontAwesomeIcon
              onPress={() => setModalOpen(false)}
              icon={faTimes}
              color={Colors.secondary}
              size={36}
            />
          </View>
          <Text style={globalStyles.header}>Activity levels</Text>
          <View style={styles.modalParagraph}>
            <View style={styles.stars}>{starIcon}</View>
            <Text style={styles.text}>I am sedentary (little or no exercise)</Text>
          </View>
          <View style={styles.modalParagraph}>
            <View style={styles.stars}>{starIcon}{starIcon}</View>
            <Text style={styles.text}>I am lightly active (light exercise or sports 1-3 days per week)</Text>
          </View>
          <View style={styles.modalParagraph}>
            <View style={styles.stars}>{starIcon}{starIcon}{starIcon}</View>
            <Text style={styles.text}>I am moderately active (moderate exercise/sports 3-5 days per week)</Text>
          </View>
          <View style={styles.modalParagraph}>
            <View style={styles.stars}>{starIcon}{starIcon}{starIcon}{starIcon}</View>
            <Text style={styles.text}>I am very active (hard exercise/sports 6-7 days per week)</Text>
          </View>
          <View style={styles.modalParagraph}>
            <View style={styles.stars}>{starIcon}{starIcon}{starIcon}{starIcon}{starIcon}</View>
            <Text style={styles.text}>I am super active (very hard exercise/sports and a physical job)</Text>
          </View>
        </View>
      </Modal>

      <View style={style}>
        <FontAwesomeIcon
          onPress={() => setModalOpen(true)}
          icon={faQuestionCircle}
          color={Colors.primary}
          size={30}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  modalCloseIcon: {
    marginVertical: 20,
  },
  modalParagraph: {
    alignItems: 'center',
    marginVertical: 10
  },
  stars: {
    flexDirection: 'row',
    padding: 5
  },
  text: {
    textAlign: 'center',
    fontSize: 18
  }
})

export default ActivityInfo