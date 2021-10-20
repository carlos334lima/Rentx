import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
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
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState("");
  const [driver_license, setDriverLicense] = useState(user.driver_license);
  const [activeOption, setActiveOption] = useState<"dataEdit" | "passwordEdit">(
    "dataEdit"
  );

  function handleBack() {
    navigation.goBack();
  }

  

  const handleSelectedPickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (photo.cancelled) {
      return;
    }

    if (photo.uri) {
      setAvatar(photo.uri);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <Container>
        <Header>
          <HeaderTop>
            <BackButton color={theme.colors.shape} onPress={handleBack} />
            <HeaderTitle>Editar Perfil</HeaderTitle>
            <LogoutButton onPress={signOut}>
              <Feather name="power" size={24} color={theme.colors.shape} />
            </LogoutButton>
          </HeaderTop>

          <PhotoContainer>
            {!!avatar && (
              <Photo
                source={{
                  uri: avatar,
                }}
              />
            )}
            <PhotoButton onPress={handleSelectedPickImage}>
              <Feather name="camera" size={24} color={theme.colors.shape} />
            </PhotoButton>
          </PhotoContainer>
        </Header>

        <Content style={{ marginBottom: useBottomTabBarHeight() }}>
          <Options>
            <Option
              active={activeOption === "dataEdit"}
              onPress={() => setActiveOption("dataEdit")}
            >
              <OptionTitle active={activeOption === "dataEdit"}>
                Dados
              </OptionTitle>
            </Option>
            <Option
              active={activeOption === "passwordEdit"}
              onPress={() => setActiveOption("passwordEdit")}
            >
              <OptionTitle active={activeOption === "passwordEdit"}>
                Trocar senha
              </OptionTitle>
            </Option>
          </Options>

          {activeOption === "dataEdit" && (
            <Section>
              <Input
                iconName="user"
                placeholder="Nome"
                autoCorrect={false}
                defaultValue={user.name}
                onChangeText={setName}
                value={name}
              />
              <Input
                iconName="mail"
                editable={false}
                autoCorrect={false}
                defaultValue={user.email}
                value={user.email}
              />
              <Input
                iconName="credit-card"
                placeholder="CHN"
                keyboardType="numeric"
                autoCorrect={false}
                defaultValue={user.driver_license}
                value={driver_license}
              />
            </Section>
          )}

          {activeOption === "passwordEdit" && (
            <Section>
              <PasswordInput iconName="lock" placeholder="Senha atual" />
              <PasswordInput iconName="lock" placeholder="Nova senha" />
              <PasswordInput iconName="lock" placeholder="Repetir nova senha" />
            </Section>
          )}
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}
