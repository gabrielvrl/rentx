import React, { useState } from 'react';

import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';

import { DayProps, MarkedDateProps } from '../../components/Calendar/index';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { format } from 'date-fns/esm';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { RouteParams } from '../CarDetails';

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps)

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  const handleConfirmRental = () => {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione o interval para alugar');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDate)
      })
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDate(interval)

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
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
          onPress={handleBack}
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
            <S.DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>

        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar
          markedDates={markedDate}
          onDayPress={handleChangeDate}
        />
      </S.Content> 

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
}
