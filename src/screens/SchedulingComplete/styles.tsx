import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
 flex: 1;
 background-color: ${({ theme }) => theme.colors.header};

 padding-top: 96px;
`

export const Content = styled.View`
 flex: 1;
 justify-content: center;
 align-items: center;
 
`

export const Title = styled.Text`
 font-size: ${RFValue(30)}px;
 color: ${({theme}) => theme.colors.shape};
 font-family: ${({theme}) => theme.fonts.secoundary_500};
`

export const Message = styled.Text`
 font-size: ${RFValue(15)}px;
 color: ${({theme}) => theme.colors.text_detail};
 font-family: ${({theme}) => theme.fonts.primary_400};
 text-align: center;
 margin-top: 16px;
 line-height: 25px;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin: 120px  0px;
`