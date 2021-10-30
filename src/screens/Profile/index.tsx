import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  View,
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
  const { user, signOut, updateUser } = useAuth();
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

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driver_license: Yup.string().required("CNH é obrigatória!"),
        name: Yup.string().required("Nome é obrigatória!"),
      });

      const data = { name, driver_license };

      schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        name,
        email: user.email,
        driver_license: driver_license,
        avatar: user.avatar,
        token: user.token,
      });

      Alert.alert("Perfil Atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Ops...", error.message);
      }
      Alert.alert("Não foi possível atualizar o perfil!");
    }
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

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Lembre-se, que se você sair, precisará de internet para conectar-se novamente.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <ScrollView>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
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
                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir nova senha"
                />
              </Section>
            )}
          </Content>
          <View
            style={{
              marginRight: 10,
              marginLeft: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button title="Salvar Alterações" onPress={handleProfileUpdate} />
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
