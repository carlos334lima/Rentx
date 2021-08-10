import React from "react";
import { ActivityIndicator } from "react-native";

//@Libraries
import { useTheme } from "styled-components";

//@Styles
import { Container } from "./styles";

interface Props {
  color?: any
}

const Loading = ({color}: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator size="large" color={color ? color :'#fff'} style={{ opacity: 1 }}/>
    </Container>
  );
};

export { Loading };
