import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import { calcBMI, rangeBMI, idealBMI, userBmiTip } from '../utils/equations';
import { State } from '../redux-toolkit/interfaces';

import Colors from '../utils/Colors';
import { globalStyles } from '../utils/globalStyles';
import InputRange from '../components/InputRange';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Bmi: React.FC<Props> = ({ navigation }) => {
  const userData = useSelector((state: State) => state.data);

  const { height, weight, age, sex, lifeActivity } = userData;
  const [normalBMIMin, normalBMIMax] = idealBMI(userData);

  if (height && weight && age && sex && lifeActivity) {
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <Text style={globalStyles.header}>
            BMI Score: {calcBMI(userData)} %
          </Text>
          <View style={{ ...globalStyles.infoContainer, width: '85%' }}>
            <Text style={styles.info}>Classified as:</Text>
            <Text style={styles.data}>{rangeBMI(calcBMI(userData))}</Text>
          </View>
          <View style={{ ...globalStyles.infoContainer, width: '85%' }}>
            <Text style={styles.info}>Healthy BMI:</Text>
            <Text style={styles.data}>
              {normalBMIMin}kg - {normalBMIMax}kg
            </Text>
          </View>
          <View style={{ ...globalStyles.infoContainer, width: '85%' }}>
            <Text style={styles.info}>{userBmiTip(userData)}</Text>
          </View>

          {/* <InputRange /> */}

          <View style={styles.description}>
            <Text style={styles.paragraph}>
              Please note that BMI is not the most accurate way to measure body
              weight.
            </Text>
            <Text style={styles.paragraph}>
              It fails to take into account a person`s bone density, waist size,
              age, race and other important factors to determine obesity.
            </Text>
            <Text style={styles.paragraph}>
              Trained athletes are at a great disadvantage: their excess muscle
              puts them at a higher BMI, so they may be considered obese.
            </Text>
          </View>
          <View>
            <Text style={styles.paragraph}>For more accurate informations</Text>
            <Button
              title='go to body fat page'
              onPress={() => navigation.navigate('Body Fat Percentage')}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <View style={{ width: '80%' }}>
          <Text
            style={{ fontSize: 20, textAlign: 'center', marginVertical: 15 }}
          >
            Complete informations about yourself first
          </Text>
          <Button
            title='go to personal data page'
            color={Colors.secondary}
            onPress={() => navigation.navigate('Personal Data')}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  info: { fontSize: 20, textAlign: 'center' },
  data: { fontSize: 18, fontWeight: 'bold' },
  description: { marginVertical: 30 },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    paddingVertical: 10
  }
});

export default Bmi;
