import React from "react";

//@libraries
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

//@styles
import { Container } from "./styles";

interface Props extends BorderlessButtonProps {
  color?: string;
}

const BackButton = ({ color, ...rest }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  );
};

export { BackButton };
