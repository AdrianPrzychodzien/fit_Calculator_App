import React, { useState } from 'react'

import { View, Text, StyleSheet, Modal, Button } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'


const BodyFatInfo = ({ style, navigation }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const closeAndGo = () => {
    navigation.navigate('Body Fat Percentage')
    setModalOpen(false)
  }

  return (
    <>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={globalStyles.container}>
          <View style={styles.modalCloseIcon}>
            <FontAwesomeIcon
              onPress={() => setModalOpen(false)}
              icon={faTimes}
              color={Colors.warning}
              size={36}
            />
          </View>
          <Text style={globalStyles.header}>Body fat info</Text>
          <View style={styles.modalParagraph}>
            <Text style={styles.text}>
              You can check your body fat percentage by usingskinfold caliper,
            but the most commonly used estimation formula in body fat percentage calculations
            is theU.S. Navy fitness formula.
            </Text>
            <Text style={styles.text}>
              Calculation require giving body measurements in specific areas.
            </Text>
          </View>
          <Button title="Add them in body fat page"
            color={Colors.secondary}
            onPress={closeAndGo}
          />
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
    marginVertical: 10,
    marginBottom: 30
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
})

export default BodyFatInfo