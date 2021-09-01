import React, { useState } from "react";
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
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { car } = route.params as Params; //Taking data from the other screen

  function handleNavigationGoBack() {
    navigation.navigate("Home");
  }

  function handleNavigationScheduling() {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate("Scheduling", { car });
      setLoading(false);
    }, 1700);
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleNavigationGoBack} />
        </Header>

        <CarImages>
          <ImageSlider imagesURL={car.photos} />
        </CarImages>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight(),
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
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
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período de aluguel"
          onPress={handleNavigationScheduling}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
