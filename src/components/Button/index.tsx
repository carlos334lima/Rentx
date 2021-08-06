import React from "react";
import { Loading } from "../Loading";



import { Container, Title } from "./styles";

interface Props{
  title: string;
  color?: string;
  onPress?: () => void
  loading?: boolean;
}

export function Button({ title, color, onPress, loading = false, ...rest }: Props) {

  return (
    <Container {...rest} color={color} onPress={onPress} style={{ opacity: loading ? 0.3 : 1}}>
      {loading && <Loading/>}
      <Title>{title}</Title>
    </Container>
  );
}
