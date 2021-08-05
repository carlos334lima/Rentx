import React, { useEffect, useState } from "react";
import { Platform, StatusBar, View } from "react-native";

//@Libraries
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import Toast, { BaseToast } from "react-native-toast-message";

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
        Toast.show({
          type: "info",
          text1: "Ebaaa!",
          text2: "Bem vindo ao RentX, de uma olhada e se sinta em casa! 😎",
          position: "top",
          visibilityTime: 3000,
          topOffset: Platform.OS === "ios" ? 50 : 30,
        });
      } catch (error) {
        return Toast.show({
          type: "error",
          text1: "Vixi 😢",
          text2:
            "Houve um problema em carregar nossos produtos, entre e saia do app e veja se resolve.",
          position: "top",
          visibilityTime: 3000,
          topOffset: Platform.OS === "ios" ? 50 : 30,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleNavigationDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  return (
    <Container>
      <View style={{ elevation: 1 }}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardCar
              data={item}
              onPress={() => handleNavigationDetails(item)}
            />
          )}
        />
      )}
    </Container>
  );
}
