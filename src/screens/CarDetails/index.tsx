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
import { useNavigation } from "@react-navigation/native";

//@Components
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

//@Assets
import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

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

export function CarDetails() {
  const navigation = useNavigation();

  function handleNavigationGoBack(){
    navigation.goBack()
  }

  function handleNavigationScheduling(){
    navigation.navigate("Scheduling")
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavigationGoBack}/>
      </Header>

      <CarImages>
        <ImageSlider
          imagesURL={[
            "https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 560</Price>
          </Rent>
        </Details>

        <AccessoriesContainer>
          <Acessory name="300 km/h" icon={speedSvg} />
          <Acessory name="3.2s" icon={accelerationSvg} />
          <Acessory name="800 HP" icon={forceSvg} />
          <Acessory name="Gasolina" icon={gasolineSvg} />
          <Acessory name="Auto" icon={exchangeSvg} />
          <Acessory name="2 Pessoas" icon={peopleSvg} />
        </AccessoriesContainer>


        <About>
          o lendário
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período de aluguel" onPress={handleNavigationScheduling} />
      </Footer>
    </Container>
  );
}
