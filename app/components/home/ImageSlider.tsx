import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ImageSliderProps {
  images: string[];
  height?: number;
  autoPlayInterval?: number;
  padding?: number;
  slideSpacing?: number;
}

export default function ImageSlider({
  images,
  height = 200,
  autoPlayInterval = 5000,
  padding = 20
}: ImageSliderProps) {
  const currentIndexRef = useRef(0);
  const flatListRef = useRef<FlatList>(null);

  // slideSpacing'i 2*padding olarak ayarla
  const actualSlideSpacing = padding * 2;

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndexRef.current + 1) % 3;
      currentIndexRef.current = newIndex;
      console.log("New index:", newIndex);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval]);

  // const getItemLayout = (data: any, index: number) => ({
  //   length: slideWidth,
  //   offset: (slideWidth + actualSlideSpacing) * index,
  //   index,
  // });

  const slideWidth = width - padding * 2;

  const renderImage = ({ item }: { item: string }) => (
    <View style={[styles.imageContainer, { width: slideWidth, height: height - padding * 2 }]}>
      <Image
        source={item}
        style={styles.image}
        contentFit="cover"
      />
    </View>
  );

  const ItemSeparator = () => <View style={{ width: actualSlideSpacing }} />;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      currentIndexRef.current = viewableItems[0].index;
    }
  }).current;

  return (
    <View style={[styles.container, { height, paddingHorizontal: padding }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        ItemSeparatorComponent={ItemSeparator}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        // getItemLayout={getItemLayout}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    position: 'relative',
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 16,
  },
}); 