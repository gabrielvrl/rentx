import React, { useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Bullet } from '../Bullet'

import * as S from './styles';

interface ImageSliderProps {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider = ({ imagesUrl }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index);
  });

  return (
    <S.Container>
      <S.ImageIndexes>
        {
          imagesUrl.map((item, index) => (
            <Bullet 
              key={String(item.id)}
              active={index === imageIndex} 
            />
          ))
        }
      </S.ImageIndexes>

        <FlatList 
          data={imagesUrl}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <S.CarImageWrapper>
              <S.CarImage 
                source={{ uri: item.photo }}
                resizeMode="contain"
              />
            </S.CarImageWrapper>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />
    </S.Container>
  );
}
