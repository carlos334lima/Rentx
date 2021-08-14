import React from "react";
import { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";

import {
  Container,
  ImageIndexContainer,
  CarImage,
  ImageIndex,
  CarImageWrapper,
} from "./styles";

interface Props {
  imagesURL: string[];
}

export function ImageSlider({ imagesURL }: Props) {
  return (
    <Container>
      <ImageIndexContainer>
        {imagesURL.map((_, index) => (
          <ImageIndex key={index} active={true} />
        ))}
      </ImageIndexContainer>

      <FlatList
        data={imagesURL}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}
