import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation, useIsFocused } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

import { api } from '../../services/api';

import * as S from './styles';
import { Car } from '../../components/Car';

import { Car as ModelCar } from '../../database/model/Car';
import { format, parseISO } from 'date-fns';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export const MyCars = () => {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const screenIsFocused = useIsFocused();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('rentals');
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          }
        })

        setCars(dataFormatted);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchCars()
  }, [screenIsFocused])

  const handleBack = () => {
    navigation.goBack()
  }

  return(
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

        <S.Subtitle>
          Conforto, segurança e praticidade.
        </S.Subtitle>
      </S.Header>
      {
        loading 
        ? 
        <LoadAnimation /> 
        : 
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
          </S.Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.start_date}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.end_date}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      }
    </S.Container>
  )
}