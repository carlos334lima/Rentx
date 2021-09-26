import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, View, Text, Platform } from "react-native";

//@Libraries
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import Toast, { BaseToast } from "react-native-toast-message";
import Dialog from "react-native-dialog";

//@Components
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendars,
  DayProps,
  MarkedDateProps,
} from "../../components/Calendars";
import { generateInterval } from "../../components/Calendars/generateInterval";

//@Assets
import ArrowSvg from "../../assets/arrow.svg";

//@Utils
import { getPlatformDate } from "../../Utils/getPlatformDate";
import { CarDTO } from "../../DTOS/CarDTO";

//@Styles
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

interface rentPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentPeriod, setRentPeriod] = useState<rentPeriod>({} as rentPeriod);

  useEffect(() => {
    return Toast.show({
      type: "info",
      text1: "Chegou a hora!",
      text2: "Escolha o período que vai ficar com sua nave 🚘",
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: Platform.OS === "ios" ? 50 : 30,
    });
  }, []);

  function handleNavigationGoBack() {
    navigation.goBack();
  }

  function handleNavigationSchedulingDetail() {
    setLoading(true);

    if (!rentPeriod.startFormatted || !rentPeriod.endFormatted) {
      setVisible(true);
      return setTimeout(() => {
        setVisible(false);
        setLoading(false);
      }, 1700);
    } else {
      setTimeout(() => {
        navigation.navigate("SchedulingDetails", {
          car,
          dates: Object.keys(markedDates),
        });

        setLoading(false);
      }, 1700);
    }
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
      startFormatted: format(getPlatformDate(new Date(firstDay)), "dd/MM/yyyy"),
      endFormatted: format(getPlatformDate(new Date(endDay)), "dd/MM/yyyy"),
    });
  }

  const theme = useTheme();
  return (
    <Container>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Ops!</Dialog.Title>
          <Dialog.Description>
            Por favor, Informe o período de aluguel 😉
          </Dialog.Description>
        </Dialog.Container>
      </View>

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
        <Button
          title="Confirmar"
          onPress={handleNavigationSchedulingDetail}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
