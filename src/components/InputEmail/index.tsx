import React, { useState } from "react";
import { TextInputProps } from "react-native";

//@libraries
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

//@styles
import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value: any;
}

export function Input({ iconName, value, ...rest }: Props) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleOnBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
          name={iconName}
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={handleOnBlur}
        {...rest}
      />
    </Container>
  );
}
