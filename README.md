# React Native Pager View X


## Installation

```sh
npm install react-native-pager-view-x
# or
yarn add react-native-pager-view-x
```

## Usage
If you encounter a bug due to react-native-pager-view, you can also use the FlatList provided by default in RN.

```tsx
const pagerViewXRef = useRef<PagerViewXRef>(null);
const scrollEnabledRef = useRef(true);

return (
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
```

## Video
<table>
  <tr>
    <td>
      <video src="https://github.com/user-attachments/assets/27a7e2f1-3c05-4345-a2fd-bc1aaa873467" width="300" height="600" />
    </td>
  </tr>
</table>

## API

### `Props`

| Prop               | Type                                             | Description                                      |
|--------------------|--------------------------------------------------|--------------------------------------------------|
| `initialPage`      | number (optional)                                | The initial page index.                          |
| `scrollEnabled`    | boolean (optional)                               | Sets whether scrolling is enabled.               |
| `onPageScroll`     | function (optional)                              | Event handler for page scroll events.            |
| `children`         | ReactElement or ReactElement\[\] (optional)      | Child elements to be displayed as pages.         |
| `activityIndicator`| ReactNode (optional)                             | Component to display while a page is loading.    |
| `[key: string]`    | any                                              | Any prop that can be used in FlatList can be added                      |


### `Methods` from ref

| Method                    | Description                                      |
|---------------------------|--------------------------------------------------|
| `setPage`                 | Sets the current page.                           |
| `setPageWithoutAnimation` | Sets the current page without animation.         |
| `setScrollEnabled`        | Sets whether scrolling is enabled.               |



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
