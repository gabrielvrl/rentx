import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import * as S from './styles';

export const Profile = () => {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const { user } = useAuth(); 
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {

  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <S.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <S.Options>
              <S.Option 
                active={option === 'dataEdit'}
                onPress={() => setOption('dataEdit')}
              >
                <S.OptionTitle
                  active={option === 'dataEdit'}>
                  Dados
                </S.OptionTitle>
              </S.Option>
              <S.Option 
                active={option === 'passwordEdit'}
                onPress={() => setOption('passwordEdit')}
              >
                <S.OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>

            {
              option === 'dataEdit' 
              ?
              <S.Section>
                <Input 
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input 
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'   
                  defaultValue={user.driver_license}           
                />
              </S.Section>
              :
              <S.Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir senha'
                />
              </S.Section>
            }
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}