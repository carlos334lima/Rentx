import React from "react";

//@libraries
import { RectButtonProps } from "react-native-gesture-handler";

//@styles
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export function ConfirmButtom({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
