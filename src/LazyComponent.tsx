import React, { useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';

interface LazyComponentProps {
  componentKey: number;
  currentKey: number;
  component: React.ReactNode;
}
export const LazyComponent = (props: LazyComponentProps) => {
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
