import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

//@libraries
import * as yup from "yup";

//@components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/InputEmail";
import { useAuth } from "../../../hooks/auth";
import schemaStepFirst from "../../../Utils/Validations/stepFirst";

//@styles
import { Container, Form, Header, Steps, Subtitle, Title } from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpFirstStep() {
  const navigation = useNavigation();

  //authenticated user
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  async function handleOpenPassword() {
    try {
      //validations
      await schemaStepFirst.validate({
        name,
        email,
        driverLicense,
      });

      const data = { name, email, driverLicense };

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert(error.message);
      }
    }
  }

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

            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleOpenPassword} />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
