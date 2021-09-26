import React from "react";

//@libraries
import { RFValue } from "react-native-responsive-fontsize";
import { SvgProps } from "react-native-svg";

//@styles
import { Container, Name } from "./styles";

interface Props {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Acessory({ name, icon: Icon }: Props) {
  return (
    <Container>
      <Icon width={RFValue(32)} height={RFValue(32)} />
      <Name>{name}</Name>
    </Container>
  );
}
