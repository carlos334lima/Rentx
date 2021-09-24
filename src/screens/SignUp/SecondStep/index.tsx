import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

//@libraries
import { useNavigation } from "@react-navigation/core";

//@components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/InputPassword";

//@styles
import theme from "../../../styles/theme";
import { Container, Form, Header, Steps, Subtitle, Title } from "./styles";

export function SignUpSecondStep() {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="position" enabled>
        <Container>
          <Header>
            <BackButton onPress={() => navigation.goBack()} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie Sua {"\n"}Conta</Title>
          <Subtitle>Crie seu cadastro {"\n"}de forma rápida e fácil</Subtitle>

          <Form>
            <Title>1.Senha</Title>

            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Confirme senha" />
          </Form>
          <Button title="Cadastrar" color={theme.colors.success} />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
