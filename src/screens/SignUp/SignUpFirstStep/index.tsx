import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import * as S from './styles';

export const SignUpFirstStep = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  return (
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
      </S.Form>

    </S.Container>
  );
}