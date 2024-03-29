import React from "react";

//@libraries
import { RectButtonProps } from "react-native-gesture-handler";
import { Car } from "../../database/models/car";

//@utils
import { CarDTO } from "../../DTOS/CarDTO";
import { getAccessoryIcon } from "../../Utils/getAccessoryIcon";

//@styles
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

interface Props extends RectButtonProps {
  data: Car;
}

export function CardCar({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
