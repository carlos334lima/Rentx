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
import { Calendars, DayProps, MarkedDateProps } from "../../components/Calendars";
import { useNavigation } from "@react-navigation/native";
import { generateInterval } from "../../components/Calendars/generateInterval";

export function Scheduling() {
  const navigation = useNavigation();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)


  function handleNavigationGoBack(){
    navigation.goBack()
  }

  function handleNavigationSchedulingDetail(){
    navigation.navigate("SchedulingDetails")
  }

  function handleChangeDates(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date;

    if(start.timestamp > end.timestamp){ // Guaranteed that selected columns will not be negative
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start,end)
    setMarkedDates(interval)
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
        <Calendars MarkedDates={markedDates} onDayPress={handleChangeDates}/>
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigationSchedulingDetail}/>
      </Footer>
    </Container>
  );
}
