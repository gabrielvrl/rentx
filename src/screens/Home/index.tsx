import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import * as S from './styles';

export const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const netInfo = useNetInfo();

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        if(isMounted) {
          setCars(response.data)
        }
      } catch(error) {
        console.log(error)
      } finally {
        if(isMounted) {
          setLoading(false)
        }
      }
    };

    fetchCars();
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if(netInfo.isConnected){
      Alert.alert('Você está online', 'Aproveite para navegar em todas as funcionalidades.')
    } else {
      Alert.alert('Você está offline', 'Verifique sua conexão com a internet para ter acesso a todas as funcionalidades.')
    }

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

          {
            !loading &&
            <S.TotalCars>
              Total de {cars.length} carros
            </S.TotalCars>
          }
        </S.HeaderContent>
      </S.Header>

      {
        loading ? <LoadAnimation /> :
          <S.CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <Car data={item} onPress={() => handleCarDetails(item)} />
            }
          />
      }
    </S.Container>
  );
}