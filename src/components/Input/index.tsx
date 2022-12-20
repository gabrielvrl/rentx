import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import * as S from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName }: InputProps) {
  const theme = useTheme();

  return (
    <S.Container>
      <Feather
        name={iconName}
        size={24}
        color={theme.colors.text_details}
      />
    </S.Container>
  );
}