import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: ${RFValue(100)}px;
  height: ${RFValue(92)}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background_primary};
  padding: ${RFValue(16)}px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.primary_500};
  color: ${(props) => props.theme.colors.text};
  font-size: ${RFValue(13)}px;
`;