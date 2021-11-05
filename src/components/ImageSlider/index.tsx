import React, { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";

//@styles
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  console.log('@imagesUrl', imagesUrl)
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <ImageIndex active={index === imageIndex} key={String(item.id)} />
        ))}
      </ImageIndexes>
      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarWrapper>
            <CarImage source={{ uri: item.photo }} />
          </CarWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
