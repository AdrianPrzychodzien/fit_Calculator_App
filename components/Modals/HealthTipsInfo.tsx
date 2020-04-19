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
  healthTips: { info: string; kgAmount: number; days: number };
  dailyWeightArray: { date: string; weight: number }[];
  clearFinish: () => void;
}

const HealthTipsInfo: React.FC<Props> = ({
  healthTips,
  dailyWeightArray,
  clearFinish,
  style
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { info, kgAmount, days } = healthTips;
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : 0;

  // max weight change = 1,5% per week
  const rapidWeightChange =
    ((kgAmount / days) * 7).toFixed(2) > (+firstItem / 100 + 0.5).toFixed(2) &&
    true;

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
          <Text style={globalStyles.header}>Health tips</Text>
          <View style={styles.modalParagraph}>
            <Text style={styles.text}>
              According to the entered data you {info} in {days} days, which
              forces you to change your body weight by{' '}
              {(kgAmount / days).toFixed(2)}kg per day (
              {((kgAmount / days) * 7).toFixed(2)}kg per week)
            </Text>
            <Text style={styles.text}>
              Healthy pace of lost/gain weight is about 1% of your body weight.
            </Text>
            {rapidWeightChange ? (
              <>
                <Text style={styles.text}>
                  You will need to change weight too quickly! Consider slowing
                  down to prevent side effects, like yo-yo effect.
                </Text>
                <Text style={styles.text}>
                  Mayby you should extend timeline?
                </Text>
              </>
            ) : (
              <Text style={styles.text}>
                You are changing your weight in healthy pace! Well done!
              </Text>
            )}
          </View>
          {rapidWeightChange && (
            <Button
              color={Colors.warning}
              onPress={() => clearFinish()}
              title='Change finish date'
            />
          )}
        </View>
      </Modal>

      <View style={style}>
        <Button
          onPress={() => setModalOpen(true)}
          color={rapidWeightChange ? Colors.warning : Colors.primary}
          title={
            rapidWeightChange
              ? `Fast pace of weight change!`
              : 'Healthy pace of weight change'
          }
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
    fontSize: 20,
    marginVertical: 10
  }
});

export default HealthTipsInfo;
