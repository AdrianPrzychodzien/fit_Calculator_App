import React, { useState } from 'react'

import { View, Text, StyleSheet, Modal, Button, ScrollView } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const WeightInfo = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Modal visible={modalOpen} animationType='slide'>
        <ScrollView>
          <View style={globalStyles.container}>
            <View style={styles.modalCloseIcon}>
              <FontAwesomeIcon
                onPress={() => setModalOpen(false)}
                icon={faTimes}
                color={Colors.warning}
                size={36}
              />
            </View>
            <Text style={globalStyles.header}>Weight loss process</Text>
            <View style={styles.modalParagraph}>
              <Text style={styles.text}>
                Losing weight is usually not a linear process.
            </Text>
              <Text style={styles.text}>
                Some days and weeks you may lose weight,
              while during others you may gain a little bit.
            </Text>
              <Text style={styles.text}>
                This is not a cause for concern. It’s normal for body weight
              to fluctuate up and down by a few kg. For example, you may
              be carrying more food in your digestive
              system or holding on to more water than usual.
            </Text>
              <Text style={styles.text}>
                This is even more pronounced in women, as water weight can
              fluctuate significantly during the menstrual cycle.
            </Text>
              <Text style={styles.text}>
                As long as the general trend is going downwards, no matter how much it
              fluctuates, you will still succeed in losing weight over the long term.
            </Text>
              <Text style={styles.text}>
                The same applies to the process of building muscle mass.
            </Text>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <View style={style}>
        <Button
          onPress={() => setModalOpen(true)}
          color={Colors.primary}
          title="Weight change process"
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
    fontSize: 20,
    marginVertical: 10
  },
})

export default WeightInfo