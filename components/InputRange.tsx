import React from 'react';
import { useSelector } from 'react-redux';
import { calcBMI } from '../utils/equations';
import { View, StyleSheet } from 'react-native';

import { State } from '../redux-toolkit/interfaces';
import Slider from '@react-native-community/slider';

const InputRange: React.FC = () => {
  const userData = useSelector((state: State) => state.data);

  return (
    <View>
      <Slider
        style={{ width: 200, height: 40 }}
        value={calcBMI(userData)}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InputRange;
