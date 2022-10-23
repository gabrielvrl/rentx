import React from 'react';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

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

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';

export const CarDetails: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleConfirmRental = () => {
    navigation.navigate('Scheduling')
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => { console.log('pressed'); } } color={''} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>AO DIA</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSVG} />
          <Accessory name="3.2s" icon={AccelerationSVG} />
          <Accessory name="800 HP" icon={ForceSVG} />
          <Accessory name="Gasolina" icon={GasolineSVG} />
          <Accessory name="Auto" icon={ExchangeSVG} />
          <Accessory name="2 pessoas" icon={PeopleSVG} />
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
          na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>

    </Container>
  );
}