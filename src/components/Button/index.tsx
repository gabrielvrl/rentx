import React from 'react';

import { useTheme } from 'styled-components'

import { 
  Container,
  Title,
} from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export const Button = ({ title, color, onPress }: ButtonProps) => {
  const theme = useTheme();

  return (
    <Container 
      onPress={onPress} 
      color={color ? color : theme.colors.main}
    >
      <Title>{title}</Title>
    </Container>
  );
}