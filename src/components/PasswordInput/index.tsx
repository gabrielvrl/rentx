import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as S from './styles';


interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const PasswordInput = ({ iconName, ...rest }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  }

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
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange} >
        <S.IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_details}
          />
        </S.IconContainer>
      </BorderlessButton>
    </S.Container>
  );
}