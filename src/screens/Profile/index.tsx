import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

//@libraries
import * as Yup from "yup";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import { useNetInfo } from "@react-native-community/netinfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

//@utils
import { useAuth } from "../../hooks/auth";

//@components
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/InputEmail";
import { Button } from "../../components/Button";
import { PasswordInput } from "../../components/InputPassword";

//@styles
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import theme from "../../styles/theme";

export function Profile() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={() => {}}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo
            source={{
              uri: "https://avatars.githubusercontent.com/u/68131444?v=4",
            }}
          />
          <PhotoButton onPress={() => {}}>
            <Feather 
              name="camera"
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}
