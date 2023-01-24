import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import * as S from './styles';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { useAuth } from '../../hooks/auth';
import { useEffect } from 'react';
import { database } from '../../database';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const handleSignIn = async () => {
    try{
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha obrigatória'),
      });
  
      await schema.validate({ email, password });

      signIn({ email, password });
      Alert.alert('Sucesso', 'Login realizado com sucesso!')
    } catch(error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais.');
      }
    }
  };

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep');
  }

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users');
      const users = await userCollection.query().fetch();
      console.log(users)
    }
  }, [])

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <S.Header>
            <S.Title>
              Estamos{'\n'}quase lá.
            </S.Title>
            <S.SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </S.SubTitle>
          </S.Header>

          <S.Form>
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button 
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button 
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </S.Footer>

        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}