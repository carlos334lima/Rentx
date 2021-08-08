import React, { useState, useEffect } from "react";
import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../DTOS/CarDTO";
import { format } from "date-fns";
import { getPlatformDate } from "../../Utils/getPlatformDate";
import { api } from "../../services/api";
import { getAccessoryIcon } from "../../Utils/getAccessoryIcon";
interface Params {
  car: CarDTO;
  dates: string[];
}

interface PropsDateRental {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const theme = useTheme();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const [loading, setLoading] = useState(false);
  const [dateRental, setDateRental] = useState<PropsDateRental>(
    {} as PropsDateRental
  );

  useEffect(() => {
    console.log(car)
  },[])

  useEffect(() => {
    setDateRental({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  const navigation = useNavigation();

  async function handleNavigationSchedulingConfirm() {
    setLoading(true);

    const schedulesByCars = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = {
      ...schedulesByCars.data.unavailable_dates,
      ...dates,
    };

    await api.post('schedules_byuser', {
      user_id: 1,
      car
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(() => {
      navigation.navigate("SchedulingComplete");
      setLoading(false);
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  const totalRent = Number(car.rent.price * dates.length);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesURL={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
        {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.name}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{dateRental.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{dateRental.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.rent.price} x {dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {totalRent}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title="Alugar Agora"
          onPress={handleNavigationSchedulingConfirm}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
