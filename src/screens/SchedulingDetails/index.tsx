import React, { useEffect, useState } from 'react';

import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { RFValue } from 'react-native-responsive-fontsize';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { RouteParams } from '../CarDetails';

import * as S from './styles';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';

import { Alert } from 'react-native'
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { useNetInfo } from '@react-native-community/netinfo';

interface RentalPeriod {
  start: string;
  end: string;
}

export const SchedulingDetails: React.FC = () => {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState({} as CarDTO);
  const netInfo = useNetInfo();
  

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;

  const rentTotal = Number(dates.length * car.price);

  const handleConfirmRental = async () => {
    setLoading(true)

    await api.post('rentals', {
      user_id: 1,
      car_id: car.id,
      startDate: new Date(dates[0]),
      endDate: new Date(dates[dates.length - 1]),
      total: rentTotal,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel`,
        nextScreenRoute: 'Home'
      })
    })
    .catch((e) => {
      console.log(e)
      setLoading(false)
      Alert.alert('Não foi possível realizar o agendamento nessa data')
    })
  }

  const handleBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, []);

  useEffect(() => {
    const fetchCarUpdated = async () => {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} color={''} />
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={
            !!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R${car.price}</S.Price>
          </S.Rent>
        </S.Details>

        {
          carUpdated.accessories &&        
          <S.Accessories>
            {
              carUpdated.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </S.Accessories>
        }

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetail>
            <S.RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetail>
        </S.RentalPrice>

      </S.Content>

      <S.Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>

    </S.Container>
  );
}