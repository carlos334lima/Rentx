import React from 'react';

import { useWindowDimensions } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {Container, Content, Title, Message, Footer} from './styles'
import { ConfirmButtom } from '../../components/ConfirmButtom';

export function SchedulingComplete(){
  const { width } = useWindowDimensions()
  return (
    <Container>
      <LogoSvg width={width}/>

      <Content>
        <DoneSvg />
        <Title>Carro Alugado!</Title>


        <Message>
          Agora você só precisa ir {'\n'}
          a uma concessonária da RentX {'\n'}
          pegar seu automóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButtom title="OK"/>
      </Footer>
    </Container>
  )
}