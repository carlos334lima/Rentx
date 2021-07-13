import { RFValue } from "react-native-responsive-fontsize";
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: ${(props) => props.theme.colors.background_secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  overflow: hidden;

  margin-top: ${RFValue(50)}px;
  margin-left: ${RFValue(24)}px;
`;

export const SliderContainer = styled.View``;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(32)}px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-family: ${(props) => props.theme.fonts.secoundary_500};
  font-size: ${RFValue(10)}px;
  color: ${(props) => props.theme.colors.text_detail};
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.secoundary_500};
  font-size: ${RFValue(25)}px;
  color: ${(props) => props.theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-family: ${(props) => props.theme.fonts.secoundary_500};
  font-size: ${RFValue(10)}px;
  color: ${(props) => props.theme.colors.text_detail};
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.secoundary_500};
  font-size: ${RFValue(25)}px;
  color: ${(props) => props.theme.colors.main};
`;

export const AccessoriesContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: ${RFValue(16)}px 0;
`;

export const About = styled.Text`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${(props) => props.theme.colors.text};
  line-height: ${RFValue(25)}px;
  text-align: justify;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background_primary};
  padding: ${RFValue(24)}px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight()};
`