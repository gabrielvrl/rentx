import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import * as S from './styles';

const WIDTH = Dimensions.get('window').width

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          translateX: withTiming(animation.value,{
            duration: 1000,
            easing: Easing.bezier(.01,1.07,1,-0.28)
          })
        }
      ]
    }
  })

  const handleAnimationPosition = () => {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <S.Container>
      <Animated.View style={[styles.box, animatedStyles]} />

    <Button title="Mover" onPress={handleAnimationPosition} />
    </S.Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  }
})