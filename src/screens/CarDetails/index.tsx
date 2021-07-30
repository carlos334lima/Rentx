import React from "react";
import { StatusBar } from "react-native";

//@Libraries
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";

//@Components
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

//@Assets
import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

//@Styles
import {
  Container,
  Header,
  SliderContainer,
  AccessoriesContainer,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Content,
  About,
  Footer,
  CarImages,
} from "./styles";
import { CarDTO } from "../../DTOS/CarDTO";
import { getAccessoryIcon } from "../../Utils/getAccessoryIcon";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleNavigationGoBack() {
    navigation.goBack();
  }

  function handleNavigationScheduling() {
    navigation.navigate("Scheduling");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavigationGoBack} />
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
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <AccessoriesContainer>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.name}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </AccessoriesContainer>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período de aluguel"
          onPress={handleNavigationScheduling}
        />
      </Footer>
    </Container>
  );
}
