import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/InputEmail";
import { PasswordInput } from "../../components/InputPassword";

import * as yup from "yup";

import { Container, Footer, Form, Header, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/core";

const SignIn: React.FC = () => {

  const navigation = useNavigation()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required("E-mail obrigatório!")
          .email("E-mail inválido!"),
        password: yup.string().required("Senha obrigatório!"),
      });

      await schema.validate({ email, password });
      Alert.alert("Tudo beleza", "Vamos lá!!");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert(error.message);
      } else {
        Alert.alert("Error de autenticação");
      }
    }
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{"\n"} quase lá. </Title>
            <SubTitle>
              Faça seu login para começar {"\n"} uma experiência incrível!
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={false}
              loading={false}
            />
            <Button
              title="Criar Conta Gratuita"
              onPress={handleNewAccount}
              enabled={false}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
