import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { RectButton } from "react-native-gesture-handler";

interface ContainerProps {
  color: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  padding: ${RFValue(19)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme, color}) => color ? color : theme.colors.main};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: #fff;
`;
