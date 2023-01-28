import React, { useEffect, useState } from 'react';
import { Alert, Button, StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/Car';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import * as S from './styles';

export const Home: React.FC = () => {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const netInfo = useNetInfo();

  const handleCarDetails = (car: ModelCar) => {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize(){
    try{
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
          
          const { changes, latestVersion } = response.data;
          return { changes, timestamp: latestVersion }
        },
        pushChanges: async ({ changes }) => {
          const user = changes.users;
          await api.post('/users/sync', user);
        },
      });
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if(isMounted) {
          setCars(cars)
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
    if(netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected])

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