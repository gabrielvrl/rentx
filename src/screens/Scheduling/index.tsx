import React from 'react';

import { useTheme } from 'styled-components';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles';
import { StatusBar } from 'react-native';

export const Scheduling = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingDetails')
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          onPress={() => { }}
          color={theme.colors.shape}
        />

        <S.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </S.Title>
        


        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={false}>18/06/2021</S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={false}>18/06/2021</S.DateValue>
          </S.DateInfo>

        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content> 

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
}
