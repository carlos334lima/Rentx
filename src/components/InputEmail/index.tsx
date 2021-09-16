import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value: string;
}

export function Input({ iconName, value, ...rest }: Props) {

  const theme = useTheme();

  return (
    <Container >
    <IconContainer >
      <Feather  
        size={24}
        color={ theme.colors.main }
        name={iconName}
      />
    </IconContainer>
    <InputText 
      {...rest}
    />
  </Container>
  );
}
