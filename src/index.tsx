import React, {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  useWindowDimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';

interface LazyComponentProps {
  componentKey: number;
  currentKey: number;
  component: React.ReactNode;
}
const LazyComponent = (props: LazyComponentProps) => {
  const { componentKey, currentKey, component } = props;

  const [hasRendered, setHasRendered] = useState(false);

  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (!hasRendered && currentKey === componentKey) {
      setHasRendered(true);
    }
  }, [currentKey, componentKey, hasRendered]);

  if (hasRendered) return component;
  return (
    <View
      style={{
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

interface PagerViewProps {
  initialPage?: number;
  scrollEnabled?: boolean;
  onPageScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  children?: React.ReactElement | React.ReactElement[];
}

export function PagerViewX(props: PagerViewProps) {
  const { scrollEnabled, children, onPageScroll, initialPage, ...otherProps } =
    props;

  const flatListRef = useRef<FlatList>(null);
  const [page, setPage] = useState(initialPage ?? 0);
  const data = useMemo(
    () => React.Children.toArray(children) as ArrayLike<ReactElement>,
    [children]
  );

  const { width: windowWidth } = useWindowDimensions();

  const renderItem = useCallback(
    // @ts-ignore
    ({ item, index }) => (
      <LazyComponent
        componentKey={index}
        currentKey={page}
        component={<View style={{ width: windowWidth }}>{item}</View>}
      />
    ),
    [page, windowWidth]
  );

  useEffect(() => {
    if (initialPage) {
      if (initialPage < 0 || initialPage >= data.length) {
        console.warn(
          `PagerViewX: initialPage ${initialPage} is out of bounds [0, ${data.length - 1}]`
        );
        return;
      }

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialPage,
          animated: false,
        });
      }, 0);
    }
  }, [data.length, initialPage]);

  return (
    <FlatList
      ref={flatListRef}
      pagingEnabled={true}
      horizontal={true}
      getItemLayout={(_data, index) => ({
        length: windowWidth,
        offset: windowWidth * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
        waitForInteraction: false,
      }}
      keyExtractor={(_, index) => index.toString()}
      onViewableItemsChanged={({ viewableItems }) => {
        if (
          viewableItems &&
          viewableItems[0] &&
          viewableItems[0].index !== undefined &&
          viewableItems[0].index !== null
        ) {
          setPage(viewableItems[0].index);
        }
      }}
      data={data}
      renderItem={renderItem}
      onScroll={onPageScroll}
      {...otherProps}
    />
  );
}
