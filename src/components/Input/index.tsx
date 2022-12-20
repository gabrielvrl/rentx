import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import * as S from './styles';


interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const Input = ({ iconName, ...rest }: Props) => {
  const theme = useTheme();

  return (
    <S.Container >
      <S.IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_details}
        />
      </S.IconContainer>

      <S.InputText
        {...rest}
      />
    </S.Container>
  );
}