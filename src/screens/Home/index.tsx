import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

//@Libraries
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

//@Components
import { CardCar } from "../../components/CardCar";
import { api } from "../../services/api";

//@Assets
import Logo from "../../assets/logo.svg";

//@Styles
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { CarDTO } from "../../DTOS/CarDTO";
import { Loading } from "../../components/Loading";

export function Home() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("cars");
        setCars(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleNavigationDetails() {
    navigation.navigate("CarDetails");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total 14 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Loading/>
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={handleNavigationDetails} />
          )}
        />
      )}
    </Container>
  );
}
