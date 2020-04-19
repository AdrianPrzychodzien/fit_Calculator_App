import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Dimensions
} from 'react-native';

import { healthyProgress, myDateFormat } from '../../utils/equations';
import WeightTrackerInfo from '../Modals/WeightTrackerInfo';
import { LineChart } from 'react-native-chart-kit';
import { State } from '../..//redux-toolkit/interfaces';

import Colors from '../../utils/Colors';
import { globalStyles } from '../../utils/globalStyles';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Chart: React.FC<Props> = ({ navigation }) => {
  const userData = useSelector((state: State) => state.data);

  const { dailyWeightArray, weightGoal, start, finish } = userData;

  const healthy = healthyProgress(userData);

  let healthyArr = healthy.map((item) => {
    return {
      day: item.date.slice(5, 10),
      healthy: item.weight
    };
  });

  // Can add healthy property to specific object??
  const calcHealthyProperty = (item: { weight: string; date: string }) => {
    let output;
    for (let i = 0; i < healthyArr.length; i++) {
      if (healthyArr[i].day === item.date.slice(5, 10)) {
        output = healthyArr[i].healthy;
      }
    }
    return output;
  };

  let dailyWeights = dailyWeightArray.map((item) => {
    return {
      day: item.date.slice(5, 10),
      weight: item.weight,
      goal: weightGoal,
      ...(calcHealthyProperty(item) && { healthy: calcHealthyProperty(item) })
    };
  });

  const data = [...dailyWeights];

  const labels: string[] = [];
  const weights: number[] = [];
  const goalData: any[] = [];
  const healthyData: any[] = [];

  data.slice(0).map((item, index) => {
    if (dailyWeightArray.length < 10) labels.push(item.day);
    else if (dailyWeightArray.length > 10 && dailyWeightArray.length < 25)
      index % 3 === 0 && labels.push(item.day);
    else if (dailyWeightArray.length > 25 && dailyWeightArray.length < 50)
      index % 5 === 0 && labels.push(item.day);
    else index % 12 === 0 && labels.push(item.day);
    weights.push(+item.weight);
    goalData.push(item.goal);
    item.healthy && healthyData.push(item.healthy);
  });

  if ((dailyWeightArray.length, weightGoal, start, finish)) {
    return (
      <>
        <ScrollView>
          <View style={globalStyles.container}>
            <Text style={{ ...globalStyles.header, fontSize: 20 }}>
              Start day was on {myDateFormat(start)}
            </Text>
            <Text style={{ ...globalStyles.header, fontSize: 20 }}>
              Finish will be on {myDateFormat(finish)}
            </Text>

            {/* Chart with actual weight */}
            <Text style={styles.chartTitle}>Actual weight change</Text>
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: weights,
                    color: () => `red`
                  },
                  { data: goalData }
                ],
                legend: ['actual weight', 'goal']
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisSuffix='kg'
              segments={2}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: '#E5E8E8',
                backgroundGradientTo: 'white',
                decimalPlaces: 0,
                color: () => `black`,
                labelColor: () => `black`,
                style: { borderRadius: 16 }
              }}
              bezier
              withDots={false}
              style={{
                marginVertical: 24,
                borderRadius: 16
              }}
            />

            {/* Chart with healthy pace of changing weight */}
            {dailyWeightArray.length > 1 ? (
              <>
                <Text style={styles.chartTitle}>Healthy weight change</Text>
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: weights,
                        color: () => `green`
                      },
                      { data: healthyData }
                    ],
                    legend: ['actual weight', 'healthy line']
                  }}
                  width={Dimensions.get('window').width} // from react-native
                  height={220}
                  segments={2}
                  yAxisSuffix='kg'
                  chartConfig={{
                    backgroundColor: 'white',
                    backgroundGradientFrom: '#E5E8E8',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 0,
                    color: () => `black`,
                    labelColor: () => `black`,
                    style: { borderRadius: 16 }
                    // propsForDots: {
                    //   strokeWidth: "5",
                    //   stroke: 'black'
                    // }
                  }}
                  bezier
                  withDots={false}
                  style={{
                    marginVertical: 24,
                    borderRadius: 16
                  }}
                />
              </>
            ) : (
              <Text style={{ ...styles.chartTitle, marginBottom: 10 }}>
                Chart with healthy pace of weight change will appear after
                second weight actualization
              </Text>
            )}

            <WeightTrackerInfo />
          </View>
        </ScrollView>
      </>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <View style={{ width: '80%' }}>
          <Text
            style={{ fontSize: 20, textAlign: 'center', marginVertical: 15 }}
          >
            Complete informations about your weight goal
          </Text>
          <Button
            title='go to weight tracker'
            color={Colors.secondary}
            onPress={() => navigation.navigate('Weight Statistics')}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  chartTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: -20,
    marginTop: 20,
    fontWeight: 'bold'
  }
});

export default Chart;
