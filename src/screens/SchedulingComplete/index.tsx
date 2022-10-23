import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import * as S from './styles';

export const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleConfirm = () => {
    navigation.navigate('Home')
  }
  return (
    <S.Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado!</S.Title>

        <S.Message>
          Agora você só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton 
          title="OK" 
          onPress={handleConfirm}
        />
      </S.Footer>

    </S.Container>
  );
}