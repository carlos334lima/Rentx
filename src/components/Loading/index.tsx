import React from "react";
import { ActivityIndicator } from "react-native";

import { Container } from "./styles";

import { useTheme } from "styled-components";

const Loading = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.colors.main} />
    </Container>
  );
};

export { Loading };
