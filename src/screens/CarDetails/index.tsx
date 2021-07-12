import React, { useCallback } from "react";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { StatusBar } from "react-native";

import {
  Container,
  Header,
  SliderContainer,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  AccessoriesContainer,
  About,
  Footer,
} from "./styles";
import { BackButton } from "../../components/BackButton";

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
    </Container>
  )
}