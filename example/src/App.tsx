import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PagerViewX } from 'react-native-pager-view-x';

export default function App() {
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

      <PagerViewX initialPage={1}>
        <View
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            backgroundColor: 'red',
          }}
        >
          <Button title={'Click me'} onPress={() => {}} />
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
