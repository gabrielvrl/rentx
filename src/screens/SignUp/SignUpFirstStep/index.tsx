import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import * as S from './styles';

export const SignUpFirstStep = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />
            <S.Steps>
              <Bullet active />
              <Bullet />
            </S.Steps>
          </S.Header>

          <S.Title>
            Crie sua{'\n'}conta
          </S.Title>
          <S.Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </S.Subtitle>

          <S.Form>
            <S.FormTitle>1. Dados</S.FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
            />

            <Input
              iconName='credit-card'
              placeholder='CNH'
            />
          </S.Form>

          <Button
            title='Próximo'
          />

        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}