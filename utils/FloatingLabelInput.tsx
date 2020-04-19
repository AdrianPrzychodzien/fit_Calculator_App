import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated } from 'react-native';

import { globalStyles } from './globalStyles';

interface Props {
  label: string;
  onChangeText: (value: any) => void;
  onBlur: (value: any) => void;
  value: number;
  keyboardType: any;
}

const FloatingLabelInput: React.FC<Props> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [labelAnim] = useState<any>(new Animated.Value(props.value ? 1 : 0));

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || props.value ? 1 : 0,
      duration: 200
    } as any).start();
  }, [props]);

  const labelStyle = {
    position: 'absolute',
    left: 8,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -14]
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14]
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000']
    })
  };

  return (
    <View>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        value={props.value.toString()}
        style={label === 'Fat %' ? globalStyles.fatInput : globalStyles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default FloatingLabelInput;
