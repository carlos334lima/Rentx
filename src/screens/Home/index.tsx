import React from "react";

import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { CardCar } from "../../components/CardCar";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

export function Home() {
  const cardDataOne = {
    brand: "AUDI",
    name: "RS COUDI 5",
    rent: {
      period: "12 DIAS",
      price: 126,
    },
    thumbnail:
      "https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png",
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total 14 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <CardCar data={cardDataOne} />}
      />

      
    </Container>
  );
}
