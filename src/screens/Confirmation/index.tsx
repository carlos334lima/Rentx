import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

//@libraries
import { useNavigation } from "@react-navigation/native";
import { ConfirmButtom } from "../../components/ConfirmButtom";

//@assets
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

//@styles
import { Container, Content, Title, Message, Footer } from "./styles";

export function Confirmation() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleNavigationGoBackHome() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg />
        <Title>Carro Alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}a uma concessonária da RentX {"\n"}
          pegar seu automóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButtom title="OK" onPress={handleNavigationGoBackHome} />
      </Footer>
    </Container>
  );
}
