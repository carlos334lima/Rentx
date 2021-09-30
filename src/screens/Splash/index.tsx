import React, { useEffect } from "react";
import { StatusBar, Dimensions } from "react-native";

//@Libraries
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

//@Assets
import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

//@Styles
import { Container } from "./styles";

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const brandStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 1500,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  function startApp() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[brandStyles, { position: "absolute" }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyles, { position: "absolute" }]}>
        <LogoSvg width={100} height={20} />
      </Animated.View>
    </Container>
  );
}
