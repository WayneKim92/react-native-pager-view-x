import React, {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  FlatList,
  useWindowDimensions,
  View,
} from 'react-native';
import { LazyComponent } from './LazyComponent';

export type PagerViewXRef = {
  setPage: (page: number) => void;
  setPageWithoutAnimation: (page: number) => void;
  setScrollEnabled: (enabled: boolean) => void;
};

interface PagerViewXProps {
  initialPage?: number;
  scrollEnabled?: boolean;
  onPageScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  children?: React.ReactElement | React.ReactElement[];
  [key: string]: any;
}

function PagerViewX(
  props: PagerViewXProps,
  ref: React.Ref<PagerViewXRef> | undefined
) {
  const { scrollEnabled, children, onPageScroll, initialPage, ...otherProps } =
    props;

  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(initialPage ?? 0);
  const [currentScrollEnabled, setCurrentScrollEnabled] =
    useState(scrollEnabled);
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
        currentKey={currentPage}
        component={<View style={{ width: windowWidth }}>{item}</View>}
      />
    ),
    [currentPage, windowWidth]
  );

  useImperativeHandle(ref, () => ({
    setPage: (page: number) => {
      if (page < 0 || page >= data.length) {
        console.warn(
          `PagerViewX: setPage ${page} is out of bounds [0, ${data.length - 1}]`
        );
        return;
      }

      flatListRef.current?.scrollToIndex({
        index: page,
        animated: true,
      });
    },
    setPageWithoutAnimation: (page: number) => {
      if (page < 0 || page >= data.length) {
        console.warn(
          `PagerViewX: setPageWithoutAnimation ${page} is out of bounds [0, ${data.length - 1}]`
        );
        return;
      }

      flatListRef.current?.scrollToIndex({
        index: page,
        animated: false,
      });
    },
    setScrollEnabled: (enabled: boolean) => {
      setCurrentScrollEnabled(enabled);
    },
  }));

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
      scrollEnabled={currentScrollEnabled}
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
          setCurrentPage(viewableItems[0].index);
        }
      }}
      data={data}
      renderItem={renderItem}
      onScroll={onPageScroll}
      {...otherProps}
    />
  );
}

export default forwardRef(PagerViewX);
