// components/Loader.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

type Props = {
  visible: boolean;
};

const Loader = ({ visible }: Props) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.stopAnimation();
    }
  }, [visible]);

  if (!visible) return null;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[styles.spinnerRing, { transform: [{ rotate: spin }] }]}
        />
        <Image
          source={require("../assets/main-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const RING_SIZE = 100;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  spinnerContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerRing: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 5,
    borderTopColor: "#007BFF",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderStyle: "solid",
  },
  logo: {
    width: RING_SIZE,
    height: RING_SIZE,
  },
});

export default Loader;
