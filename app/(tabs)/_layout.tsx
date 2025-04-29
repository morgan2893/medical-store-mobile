import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="customer/[id]"
        options={{
          headerTitle: "Customers",
          title: "Customers",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="users" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
