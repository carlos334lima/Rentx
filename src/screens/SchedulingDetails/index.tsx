import React, { useState, useEffect } from "react";

//@libraries
import { format } from "date-fns";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

//@utils
import { getPlatformDate } from "../../Utils/getPlatformDate";
import { CarDTO } from "../../DTOS/CarDTO";
import { api } from "../../services/api";
import { getAccessoryIcon } from "../../Utils/getAccessoryIcon";

//@components
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

//@styles
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
import { Alert } from "react-native";

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
    setDateRental({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  const navigation = useNavigation();

  const rentTotal = Number(dates.length * car.price);

  async function handleNavigationSchedulingConfirm() {
    setLoading(true);

    await api.post('/rentals', {      
      user_id: 1,
      car_id: car.id,
      start_date: new Date(),
      end_date: new Date(),
      total: rentTotal
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
      })
    })
    .catch((erro) => {
      console.log('erro', erro)
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    })
  }

  function handleBack(){
    navigation.goBack();    
  }

  useEffect(() => {
    setDateRental({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end:  format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  },[])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

     

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {car.price}</Price>
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
              R$ {car.price} x {dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
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
