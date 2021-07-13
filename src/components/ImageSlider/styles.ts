import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const ImageIndexContainer = styled.View`
  flex-direction: row;
  padding: ${RFValue(32)}px;
  padding-bottom: 0;
`;

export const CarImage = styled.Image`
  width: ${RFValue(280)}px;
  height: 100%;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 15px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;
