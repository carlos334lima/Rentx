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

interface CardData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: CardData;
}

export function CardCar({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GosolineSVG />
          </Type>
        </About>
      </Details>

      <CarImage 
        resizeMode="contain"
        source={{ uri: data.thumbnail }}
        />
    </Container>
  );
}
