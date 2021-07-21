import React, { useCallback, useState } from "react";

import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";


import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Back,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

export function Scheduling() {

  const theme = useTheme()
  return (
    <Container>
      <Header>
      <Back>
          <BackButton
            color={theme.colors.shape}
            onPress={() => {}}
          />
        </Back>

        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>
      </Header>
    </Container>
  )
}