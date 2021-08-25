import React from "react";
import { Button, StatusBar, StyleSheet, Dimensions } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from "react-native-reanimated";

//@Styles
import { Container } from "./styles";

const WIDTH = Dimensions.get("window").width;

export function Splash() {
  const animation = useSharedValue(0);

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(animation.value, {
        duration: 4000,
        easing: Easing.bounce

      }) }],
    };
  });

  function handleMove() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[styles.box, AnimatedStyle]} />

      <Button title="mover" onPress={handleMove} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});
