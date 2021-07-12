import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";

import GosolineSVG from "../../assets/gasoline.svg";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

export function CardCar() {
  return (
    <Container>
      <Details>
        <Brand>AUDI</Brand>
        <Name>RS 5 COUPÉ</Name>

        <About>
          <Rent>
            <Period>Ao Dia</Period>
            <Price>R$ 126</Price>
          </Rent>

          <Type>
            <GosolineSVG />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: '' }}/>
    </Container>
  );
}
