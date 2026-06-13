import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const MeshBackground = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0a060a" />
            <Stop offset="100%" stopColor="#1a0a1a" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
        
        {/* Decorative subtle circles for "mesh" effect */}
        <Circle cx={width * 0.2} cy={height * 0.2} r={200} fill="rgba(240,66,153,0.05)" />
        <Circle cx={width * 0.8} cy={height * 0.8} r={300} fill="rgba(139,92,246,0.05)" />
        <Circle cx={width * 0.5} cy={height * 0.5} r={250} fill="rgba(240,66,153,0.03)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default MeshBackground;
