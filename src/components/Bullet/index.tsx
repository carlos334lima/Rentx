import React from "react";

//@styles
import { Container } from "./styles";

interface BulletProps {
  active?: boolean;
}

export function Bullet({ active = false }: BulletProps) {
  return <Container active={active} />;
}
