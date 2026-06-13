import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing,
  interpolate
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SingleHeart = ({ delay, startX }: { delay: number, startX: number }) => {
  const translateY = useSharedValue(height + 100);
  const opacity = useSharedValue(0.6);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-100, { duration: 6000, easing: Easing.linear }),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { translateX: Math.sin(translateY.value / 50) * 20 }
      ],
      opacity: interpolate(translateY.value, [height, height * 0.8, 100, -100], [0, 0.6, 0.6, 0]),
      position: 'absolute',
      left: startX,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Heart size={24} color="#f04299" fill="#f04299" />
    </Animated.View>
  );
};

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 5000,
    startX: Math.random() * width,
  }));

  return (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' as any }]}>
      {hearts.map(heart => (
        <SingleHeart key={heart.id} delay={heart.delay} startX={heart.startX} />
      ))}
    </View>
  );
};

export default FloatingHearts;
