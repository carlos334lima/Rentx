import React from "react";

//@components
import { Loading } from "../Loading";

//@styles
import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  onPress?: () => void;
  loading?: boolean;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  loading = false,
  enabled = false,
  ...rest
}: Props) {
  return (
    <Container
      {...rest}
      color={color}
      onPress={onPress}
      style={{ opacity: loading || enabled ? 0.3 : 1 }}
      enabled={!loading}
    >
      {loading && <Loading />}
      <Title>{loading ? "" : title}</Title>
    </Container>
  );
}
