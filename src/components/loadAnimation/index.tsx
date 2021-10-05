import React from "react";

//@Libraries
import LottieView from "lottie-react-native";

//@assets
import LoadAnimationImage from "../../assets/load_animation.json";

//@styles
import { Container } from "./styles";

export const LoadAnimation = () => {
  return (
    <Container>
      <LottieView
        source={LoadAnimationImage}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
};
