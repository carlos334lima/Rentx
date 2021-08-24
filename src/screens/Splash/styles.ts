import styled from "styled-components/native";

export const Container = styled.View`
  flex: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.header};
`;
