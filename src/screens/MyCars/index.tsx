import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { BackButton } from "../../components/BackButton";
import { api } from "../../services/api";
import { useTheme } from "styled-components";

import {
  Container,
  Header,
  Back,
  Title,
  Subtitle,
  Content,
  Appointment,
  AppointmentTitle,
  AppointmentQuantity,
} from "./styles";
import { FlatList, StatusBar } from "react-native";
import { CarDTO } from "../../DTOS/CarDTO";
import { CardCar } from "../../components/CardCar";
import { Loading } from "../../components/Loading";
import { LoadAnimation } from "../../components/loadAnimation";

interface CarProps {
  car: CarDTO;
  id: string;
  user_id: string;
}

export function MyCars() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<[CarProps]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`schedules_byuser?users_id=1`);
        setCars(response.data);
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    }

    fetchCars();
  }, []);

  function handleNavigationGoBack() {
    navigation.goBack();
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Container>
        {loading ? (
          <LoadAnimation />
        ) : (
          <>
            <Header>
              <Back>
                <BackButton
                  color={theme.colors.shape}
                  onPress={handleNavigationGoBack}
                />
              </Back>

              <Title>Seus agendamentos {"\n"}estão aqui</Title>
              <Subtitle>Conforto, simplecidade e segurança!</Subtitle>
            </Header>

            <Content>
              <Appointment>
                <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
                <AppointmentQuantity>{cars.length}</AppointmentQuantity>
              </Appointment>

              <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <CardCar data={item.car} />}
              />
            </Content>
          </>
        )}
      </Container>
    </>
  );
}
