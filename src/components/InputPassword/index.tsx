import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

import { Container, IconContainer, InputText } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value: string;
}

export function InputPassword({ iconName, value, ...rest }: Props) {
  const theme = useTheme();

  const [isPasswordVisibled, setIsPasswordVisibled] = useState(false);

  function handlePasswordVisibled() {
    setIsPasswordVisibled((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather size={24} color={theme.colors.main} name={iconName} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={!isPasswordVisibled}/>
      <BorderlessButton onPress={handlePasswordVisibled}>
        <IconContainer>
          <Feather
            name={isPasswordVisibled ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
