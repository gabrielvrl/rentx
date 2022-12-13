import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import * as S from './styles';
import { Car } from '../../components/Car';

interface CarProps {
  car: CarDTO;
  id: string;
  user_id: string;
}

export const MyCars = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('schedules_byuser?user_id=1');

        setCars(response.data);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchCars()
  }, [])

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

      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>05</S.AppointmentsQuantity>
        </S.Appointments>

        <FlatList 
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => 
            <Car data={item.car} />
          }
        />
      </S.Content>
    </S.Container>
  )
}