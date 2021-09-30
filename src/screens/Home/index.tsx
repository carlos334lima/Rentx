import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

//@Libraries
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";

//@Components
import { CardCar } from "../../components/CardCar";
import { Loading } from "../../components/Loading";

//@Assets
import Logo from "../../assets/logo.svg";

//@utils
import { api } from "../../services/api";
import { CarDTO } from "../../DTOS/CarDTO";

//@Styles
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myButtonCarsStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionY.value },
        { translateX: positionX.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionY.value = ctx.positionY + event.translationY;
      positionX.value = ctx.positionX + event.translationX;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return null;
    });
  }, []);

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

  function handleOpenByCars() {
    navigation.navigate("MyCars");
  }

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
          {!loading && <TotalCars>Total {cars.length} carros</TotalCars>}
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myButtonCarsStyles,
            {
              position: "absolute",
              bottom: 13,
              right: 12,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenByCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
