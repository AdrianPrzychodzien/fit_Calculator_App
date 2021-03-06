import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux-toolkit/interfaces';

import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Modal,
  ScrollView
} from 'react-native';
import { activityLevel, restingMifflinStJeor } from '../../utils/equations';

import { Table, Row } from 'react-native-table-component';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/Colors';
import { globalStyles } from '../../utils/globalStyles';

interface Props {
  style: StyleProp<ViewStyle>;
}

const ActivityCaloriesInfo: React.FC<Props> = ({ style }) => {
  const userData = useSelector((state: State) => state.data);
  const [modalOpen, setModalOpen] = useState(false);

  const tableHead = ['Activity level', 'Kcal per day'];
  const { lifeActivity } = userData;

  const kcalPerDay = (num: number): number => {
    return Math.round(restingMifflinStJeor(userData) * activityLevel(num));
  };

  const userActivity = (data: number, num: number) => data === num && true;

  const tableData = [
    ['Basal Metabolic Rate', `${restingMifflinStJeor(userData)}}`],
    ['Sedentary', `${kcalPerDay(1)}`],
    ['Light Exercise', `${kcalPerDay(2)}`],
    ['Moderate Exercise', `${kcalPerDay(3)}`],
    ['Heavy Exercise', `${kcalPerDay(4)}`],
    ['Athlete', `${kcalPerDay(5)}`]
  ];

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
          <Text style={globalStyles.header}>
            Calories intake on different activity level
          </Text>
          <View style={styles.container}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row
                    data={tableHead}
                    widthArr={[190, 120]}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
                  >
                    {tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={[190, 120]}
                        style={[
                          styles.row,
                          index % 2 && { backgroundColor: '#F7F6E7' }
                        ]}
                        textStyle={[
                          styles.text,
                          userActivity(lifeActivity, index) && {
                            fontWeight: 'bold'
                          }
                        ]}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={style}>
        <FontAwesomeIcon
          onPress={() => setModalOpen(true)}
          color={Colors.primary}
          icon={faQuestionCircle}
          size={26}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalCloseIcon: { marginVertical: 20 },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 60, backgroundColor: Colors.primary },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 17 },
  dataWrapper: { marginTop: -1 },
  row: { height: 45, backgroundColor: '#E7E6E1' }
});

export default ActivityCaloriesInfo;
