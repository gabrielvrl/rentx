import React from 'react';
import { BackButton } from '../../components/BackButton';

import { 
  Container,
  Header
} from './styles';

export const CarDetails: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => { console.log('pressed'); } } color={''} />
      </Header>
    </Container>
  );
}