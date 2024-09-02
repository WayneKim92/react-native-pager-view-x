import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerViewX, { type PagerViewXRef } from 'react-native-pager-view-x';
import { useRef } from 'react';

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
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
        <View style={{ flex: 1, backgroundColor: 'green' }} />
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
