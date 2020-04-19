import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Picker
} from 'react-native';
import {
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle
} from '../../utils/equations';

import DietPieChart from '../DietPieChart';
import DietTable from '../DietTable';
import { State } from '../..//redux-toolkit/interfaces';

import Colors from '../../utils/Colors';
import { globalStyles } from '../../utils/globalStyles';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Cutting: React.FC<Props> = ({ navigation }) => {
  const userData = useSelector((state: State) => state.data);
  const [diet, setDiet] = useState<string>('Medium Carb');

  const { height, weight, age, sex, lifeActivity, formula } = userData;

  const formulaOption =
    formula === 'MifflinStJeor'
      ? MifflinStJeor(userData)
      : formula === 'HarrisBenedict'
      ? HarrisBenedict(userData)
      : KatchMcardle(userData);

  const kcalAmount = formulaOption - 500;

  if (height && weight && age && sex && lifeActivity) {
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <Text style={globalStyles.header}>
            Caloric needs: {kcalAmount}kcal
          </Text>
        </View>

        {/* Picker */}
        <View style={{ ...globalStyles.container, paddingVertical: 0 }}>
          <Text style={{ ...globalStyles.header, fontSize: 22 }}>
            Choose diet
          </Text>
          <Picker
            selectedValue={diet}
            style={{ height: 50, width: 180 }}
            onValueChange={(itemValue, itemIndex) => setDiet(itemValue)}
          >
            <Picker.Item label='Medium Carb' value='Medium Carb' />
            <Picker.Item label='Low Carb' value='Low Carb' />
            <Picker.Item label='High Carb' value='High Carb' />
          </Picker>
        </View>

        {/* Table */}
        <DietTable diet={diet} kcalAmount={kcalAmount} />

        {/* Pie chart */}
        <DietPieChart diet={diet} />
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

const styles = StyleSheet.create({});

export default Cutting;
