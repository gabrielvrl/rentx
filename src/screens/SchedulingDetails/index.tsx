import React from 'react';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import SpeedSVG from '../../assets/speed.svg';
import AccelerationSVG from '../../assets/acceleration.svg';
import ForceSVG from '../../assets/force.svg';
import GasolineSVG from '../../assets/gasoline.svg';
import ExchangeSVG from '../../assets/exchange.svg';
import PeopleSVG from '../../assets/people.svg';

import { RFValue } from 'react-native-responsive-fontsize';

import * as S from './styles';

export const SchedulingDetails: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => { console.log('pressed'); } } color={''} />
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={['https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png']}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>AO DIA</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          <Accessory name="380Km/h" icon={SpeedSVG} />
          <Accessory name="3.2s" icon={AccelerationSVG} />
          <Accessory name="800 HP" icon={ForceSVG} />
          <Accessory name="Gasolina" icon={GasolineSVG} />
          <Accessory name="Auto" icon={ExchangeSVG} />
          <Accessory name="2 pessoas" icon={PeopleSVG} />
        </S.Accessories>

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
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetail>
            <S.RentalPriceQuota>R$ 580 x3 diárias</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ 2.900</S.RentalPriceTotal>
          </S.RentalPriceDetail>
        </S.RentalPrice>

      </S.Content>

      <S.Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental} 
        />
      </S.Footer>

    </S.Container>
  );
}