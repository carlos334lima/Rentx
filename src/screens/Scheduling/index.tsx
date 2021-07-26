import React, { useCallback, useState } from "react";

import { StatusBar } from "react-native";
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
} from "./styles";
import { Calendars } from "../../components/Calendars";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const navigation = useNavigation();


  function handleNavigationGoBack(){
    navigation.goBack()
  }

  function handleNavigationSchedulingDetail(){
    navigation.navigate("SchedulingDetails")
  }


  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <Back>
          <BackButton color={theme.colors.shape} onPress={handleNavigationGoBack} />
        </Back>

        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={true}> 18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendars />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigationSchedulingDetail}/>
      </Footer>
    </Container>
  );
}
