import React from 'react';
import { useSelector } from 'react-redux';

import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {
  loseOrGain,
  getActualWeekDates,
  displayAverageWeight
} from '../../utils/equations';
import { State } from '../..//redux-toolkit/interfaces';

import { globalStyles } from '../../utils/globalStyles';

const Statistics: React.FC = () => {
  const userData = useSelector((state: State) => state.data);

  const { dailyWeightArray } = userData;
  const [thisWeekAvg, lastWeekAvg, beforeLastWeekAvg] = displayAverageWeight(
    dailyWeightArray,
    getActualWeekDates
  );

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Some statistics...</Text>

        <View style={globalStyles.container}>
          <Text style={styles.text}>You already {loseOrGain(userData)}</Text>
          <Text style={styles.text}>
            Average weight in actual week: {thisWeekAvg}
            {thisWeekAvg !== 'no data' && 'kg'}
          </Text>
          <Text style={styles.text}>
            Average weight one week before: {lastWeekAvg}
            {lastWeekAvg !== 'no data' && 'kg'}
          </Text>
          <Text style={styles.text}>
            Average weight two weeks before: {beforeLastWeekAvg}
            {beforeLastWeekAvg !== 'no data' && 'kg'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 20, paddingVertical: 10, textAlign: 'center' }
});

export default Statistics;
