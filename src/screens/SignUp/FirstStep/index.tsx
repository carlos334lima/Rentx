import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

//@components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/InputEmail";

//@styles
import { Container, Form, Header, Steps, Subtitle, Title } from "./styles";

export function SignUpFirstStep() {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="position" enabled>
        <Container>
          <Header>
            <BackButton onPress={() => navigation.goBack()} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie Sua {"\n"}Conta</Title>
          <Subtitle>Crie seu cadastro {"\n"}de forma rápida e fácil</Subtitle>

          <Form>
            <Title>1.Dados</Title>

            <Input iconName="user" placeholder="Nome" />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>
          <Button title="Próximo" onPress={() => navigation.navigate('SignUpSecondStep')}/>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
