import React, { useState } from 'react'

import { View, Text, StyleSheet, Modal, Button } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const DeleteGoalInfo = ({ style, clearGoal, clearGoalSaveWeights, clearFinish }) => {
  const [modalOpen, setModalOpen] = useState(false)

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
          <Text style={globalStyles.header}>Are you sure?</Text>
          <View style={styles.modalParagraph}>
            <Text style={styles.text}>
              You will lose saved information about your weight,
              as well as start and finish date from your actual goal.
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              color="orange"
              onPress={() => { clearGoalSaveWeights(); setModalOpen(false) }}
              title="Delete but leave weights"

            />
          </View>

          <View style={styles.button}>
            <Button
              color="red"
              onPress={() => { clearGoal(); setModalOpen(false) }}
              title="Delete"

            />
          </View>

          <View style={styles.button}>
            <Button
              color="orange"
              onPress={() => { clearFinish(); setModalOpen(false) }}
              title="Clear only finish date"

            />
          </View>

          <View style={styles.button}>
            <Button
              color={Colors.primary}
              onPress={() => { setModalOpen(false) }}
              title="Quit"

            />
          </View>

        </View>
      </Modal>

      <View style={style}>
        <Button
          onPress={() => setModalOpen(true)}
          color={Colors.primary}
          title="Delete actual goal and set new"
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
  button: {
    marginVertical: 10
  }
})

export default DeleteGoalInfo