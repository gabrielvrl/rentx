import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components'

import { 
  Container,
  Title,
} from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export const Button = ({ title, color, onPress, enabled = true, loading = false, light = false }: ButtonProps) => {
  const theme = useTheme();

  return (
    <Container 
      onPress={onPress} 
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{ opacity: (!enabled || loading) ? .5 : 1 }}
    >
      {
        loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title light={light}>{title}</Title>
      }
    </Container>
  );
}