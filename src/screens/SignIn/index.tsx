import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/InputEmail";
import { InputPassword } from "../../components/InputPassword";

import { Container, Footer, Form, Header, SubTitle, Title } from "./styles";

const SignIn: React.FC = () => {
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
            />
            <InputPassword
              iconName="lock"
              placeholder="senha"
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
            <Button
              title="Criar Conta Gratuita"
              onPress={() => {}}
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
