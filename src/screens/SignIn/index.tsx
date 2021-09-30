import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";

//@libraries
import * as yup from "yup";
import { useNavigation } from "@react-navigation/core";

//@components
import { Button } from "../../components/Button";
import { Input } from "../../components/InputEmail";
import { PasswordInput } from "../../components/InputPassword";

//@utils
import { useAuth } from "../../hooks/auth";
import signInValidations from "../../Utils/Validations/signIn";

//@styles
import { Container, Footer, Form, Header, SubTitle, Title } from "./styles";


const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      await signInValidations.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert(error.message);
      } else {
        Alert.alert("Error de autenticação");
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
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
