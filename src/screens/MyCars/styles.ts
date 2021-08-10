import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header};
  padding: ${getStatusBarHeight() + 30}px 24px 24px;
`;

export const Back = styled.View``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secoundary_600};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 24px;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secoundary_600};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const  Content = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 16px;
`

export const  Appointment = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 24px 0;
`

export const  AppointmentTitle = styled.Text`
font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const  AppointmentQuantity = styled.Text``