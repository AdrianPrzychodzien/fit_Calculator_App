import React, { useState, useEffect } from 'react'
import { View, TextInput, Animated } from 'react-native'

import { globalStyles } from '../utils/globalStyles'

const FloatingLabelInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [labelAnim] = useState(new Animated.Value(props.value ? 1 : 0))

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: (isFocused || props.value) ? 1 : 0,
      duration: 200
    }).start()
  }, [props])

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
    }),
  }

  return (
    <View>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
      <TextInput
        {...props}
        style={label === "Fat %" ? globalStyles.fatInput : globalStyles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

export default FloatingLabelInput