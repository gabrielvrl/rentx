import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg'
import * as S from './styles';
import { useTheme } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
  }

  const handleOpenMyCars = (car: CarDTO) => {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data)
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };

    fetchCars();
  }, [])

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <S.TotalCars>
            Total de 12 carros
          </S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      {
        loading ? <Load /> :
          <S.CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <Car data={item} onPress={() => handleCarDetails(item)} />
            }
          />
      }

      <S.MyCarsButtonWrapper>
          <GestureHandlerRootView>
            <S.MyCarsButton onPress={handleOpenMyCars}>
              <Ionicons 
                name="ios-car-sport"
                size={32}
                color={theme.colors.shape}
              />
            </S.MyCarsButton>
          </GestureHandlerRootView>
        </S.MyCarsButtonWrapper>
    </S.Container>
  );
}