import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

//@libraries
import { useNavigation, useRoute } from "@react-navigation/core";
import * as yup from "yup";

//@components
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/InputPassword";

//@styles
import theme from "../../../styles/theme";
import { Container, Form, Header, Steps, Subtitle, Title } from "./styles";
import schemaStepSecond from "../../../Utils/Validations/stepSecond";
import { api } from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  async function handleRegister() {
    try {
      await schemaStepSecond.validate({
        password,
        passwordConfirm,
      });

      await api
        .post("/users", {
          name: user.name,
          email: user.email,
          password,
          driver_license: user.driverLicense,
        })
        .then((response) => {
          console.log(response.data);
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          console.log(error)
          Alert.alert("ops...", "Não possível cadastrar")
        });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert("Ops...", error.message);
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
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie Sua {"\n"}Conta</Title>
          <Subtitle>Crie seu cadastro {"\n"}de forma rápida e fácil</Subtitle>

          <Form>
            <Title>1.Senha</Title>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Confirme senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
