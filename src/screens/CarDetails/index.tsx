import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { 
  Container,
  Header,
  CarImages,
} from './styles';

export const CarDetails: React.FC = () => {
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
    </Container>
  );
}