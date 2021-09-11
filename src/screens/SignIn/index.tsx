import React from 'react';
import { StatusBar, View } from 'react-native';
import { Button } from '../../components/Button';

import { Container, Footer, Header, SubTitle, Title } from './styles';

const SignIn: React.FC = () => {
  return (
      <Container>

<StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
          <Header>
              <Title>Estamos{'\n'} quase lá. </Title>
              <SubTitle>Faça seu login para começar {'\n'} uma experiência incrível!</SubTitle>
          </Header>

          <Footer>
              <Button 
                title="Login"
                onPress={() =>{}}
                enabled={false}
                loading={false}
              />
              <Button 
                title="Criar Conta Gratuita"
                onPress={() =>{}}
                enabled={false}
                loading={false}
              />
          </Footer>
      </Container>
  )
}

export default SignIn;