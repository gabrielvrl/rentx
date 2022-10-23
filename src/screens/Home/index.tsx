import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const carDataOne = {
    brand: 'AUDI',
    name: 'RS 5 Coupe',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail: 'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
  };

  const carDataTwo = {
    brand: 'PORSCHE',
    name: 'Panamera',
    rent: {
      period: 'AO DIA',
      price: 340,
    },
    thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-Transparent-File.png',
  };

  const handleCarDetails = () => {
    navigation.navigate('CarDetails')
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1,2,3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => 
          <Car data={carDataOne} onPress={handleCarDetails} />
        }
      />
    </Container>
  );
}