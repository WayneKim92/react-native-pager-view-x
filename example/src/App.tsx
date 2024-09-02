import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerViewX, { type PagerViewXRef } from 'react-native-pager-view-x';
import { useRef } from 'react';

const ExButton = ({ text, onPress }: { text: string; onPress: () => void }) => {
  return (
    <Pressable
      style={{
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
      }}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

export default function App() {
  const pagerViewXRef = useRef<PagerViewXRef>(null);
  const scrollEnabledRef = useRef(true);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Header</Text>
      </View>

      <PagerViewX ref={pagerViewXRef} initialPage={1}>
        <View
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            backgroundColor: 'red',
          }}
        >
          <Button
            title={'toggle setScrollEnabled'}
            onPress={() => {
              pagerViewXRef.current?.setScrollEnabled(
                !scrollEnabledRef.current
              );
              scrollEnabledRef.current = !scrollEnabledRef.current;
            }}
          />
          <ExButton
            text={'Go to 3 Page'}
            onPress={() => {
              pagerViewXRef.current?.setPage(2);
            }}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
        <View style={{ flex: 1, backgroundColor: 'green' }}>
          <ExButton
            text={'go to 1page without animation'}
            onPress={() => {
              pagerViewXRef.current?.setPageWithoutAnimation(0);
            }}
          />
        </View>
      </PagerViewX>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
