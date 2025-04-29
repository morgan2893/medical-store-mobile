// components/AnimatedTabBar.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const iconStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: withSpring(isFocused ? 1.2 : 1) }],
          };
        });

        return (
          <View key={route.key} style={styles.tab}>
            <Animated.View style={iconStyle}>
              {route.name === "Home" ? (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={isFocused ? "#673ab7" : "#222"}
                />
              ) : (
                <FontAwesome
                  name="users"
                  size={24}
                  color={isFocused ? "#673ab7" : "#222"}
                />
              )}
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tab: {
    alignItems: "center",
  },
});

export default AnimatedTabBar;
