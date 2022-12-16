import React, { useEffect } from 'react';

import BrandSVG from '../../assets/brand.svg';
import LogoSVG from '../../assets/logo.svg';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, abs } from 'react-native-reanimated';

import * as S from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, .3, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP)
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)
        }
      ]
    }
  });

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 });
  }, [])

  return (
    <S.Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSVG width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>
    </S.Container>
  );
}