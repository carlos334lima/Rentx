import React from "react";

import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from '../../assets/logo.svg'
import { CardCar } from "../../components/CardCar";

import { Container, Header, TotalCars, HeaderContent } from "./styles";

export function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total 14 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CardCar />
    </Container>
  );
}
