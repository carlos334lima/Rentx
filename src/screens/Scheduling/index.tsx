import React, { useCallback, useEffect, useState } from "react";

import { StatusBar, View, Text, Platform } from "react-native";
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
import {
  Calendars,
  DayProps,
  MarkedDateProps,
} from "../../components/Calendars";
import { useNavigation } from "@react-navigation/native";
import { generateInterval } from "../../components/Calendars/generateInterval";
import { format } from "date-fns";
import { getPlatformDate } from "../../Utils/getPlatformDate";

import Toast, { BaseToast } from "react-native-toast-message";

interface rentPeriod {
  start: number;
  end: number;
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const navigation = useNavigation();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentPeriod, setRentPeriod] = useState<rentPeriod>({} as rentPeriod);

  function handleNavigationGoBack() {
    navigation.goBack();
  }

  function handleNavigationSchedulingDetail() {
    if (!rentPeriod.start || !rentPeriod.end) {
      return Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Por favor, Informe o período de aluguel 😉",
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS === 'ios' ? 50 : 30,
        
      })
    }

    navigation.navigate("SchedulingDetails");
  }

  function handleChangeDates(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      // Guaranteed that selected columns will not be negative
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDay = Object.keys(interval)[0];
    const endDay = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDay)), "dd/MM/yyyy"),
      endFormatted: format(getPlatformDate(new Date(endDay)), "dd/MM/yyyy"),
    });
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
          <BackButton
            color={theme.colors.shape}
            onPress={handleNavigationGoBack}
          />
        </Back>

        <Toast ref={(ref) => Toast.setRef(ref)} />
        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentPeriod.startFormatted}>
              {rentPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentPeriod.endFormatted}>
              {" "}
              {rentPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendars MarkedDates={markedDates} onDayPress={handleChangeDates} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigationSchedulingDetail} />
      </Footer>
    </Container>
  );
}
