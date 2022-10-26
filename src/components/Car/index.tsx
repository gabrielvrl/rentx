import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO';
import GasolineSVG from '../../assets/gasoline.svg';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarProps extends RectButtonProps {
  data: CarDTO;
}

export const Car = ({ data, ...rest }: CarProps) => {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          
          <Type>
            <GasolineSVG />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{ uri: data.thumbnail }}
        resizeMode="contain"
      />
    </Container>
  );
}