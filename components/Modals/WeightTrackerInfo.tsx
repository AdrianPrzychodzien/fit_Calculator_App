import React, { useState } from 'react';

import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  Modal,
  Button
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/Colors';
import { globalStyles } from '../../utils/globalStyles';

interface Props {
  style: StyleProp<ViewStyle>;
}

const WeightTrackerInfo: React.FC<Props> = ({ style }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
          <Text style={globalStyles.header}>Weight loss process</Text>
          <View style={styles.modalParagraph}>
            <Text style={styles.text}>
              Though weight loss may occur faster at the start of a diet,
              experts recommend aweight loss of 0.45–1.36 kg per week, or about
              1% of your body weight.
            </Text>
            <Text style={styles.text}>
              Drastic weight changes increase the risk of yo-yo effect.
            </Text>
            <Text style={styles.text}>
              Rapid weight loss can increase your risk of gallstones,
              dehydration, and malnutrition.
            </Text>
            <Text style={styles.text}>
              Other side effects of rapid weight loss include: headaches,
              irritability, fatigue, constipation, hair loss, menstrual
              irregularities and muscle loss.
            </Text>
            <Text style={styles.text}>
              The green line marks a healthy weight change trend, so it is
              reasonable to stay possibly close to it.
            </Text>
          </View>
        </View>
      </Modal>

      <View style={style}>
        <Button
          onPress={() => setModalOpen(true)}
          color={Colors.primary}
          title='Comment on weight change'
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalCloseIcon: {
    marginVertical: 20
  },
  modalParagraph: {
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 30
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  }
});

export default WeightTrackerInfo;
