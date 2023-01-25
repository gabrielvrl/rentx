import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import * as S from './styles';

export const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {

  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop>
          <BackButton 
            color={theme.colors.shape} 
            onPress={handleBack}
          />

          <S.HeaderTitle>Editar Perfil</S.HeaderTitle>

          <S.LogoutButton onPress={handleSignOut}>
            <Feather 
              name='power' 
              size={24} 
              color={theme.colors.shape} 
            />
          </S.LogoutButton>          
        </S.HeaderTop>

        <S.PhotoContainer>
          <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/22225821?v=4' }} />
          <S.PhotoButton onPress={() => {}}>
            <Feather
              name='camera'
              size={24}
              color={theme.colors.shape}
            />
          </S.PhotoButton>
        </S.PhotoContainer>
      </S.Header>

    </S.Container>
  );
}