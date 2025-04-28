import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerTitle: "Home", title: "Home" }} />
            <Tabs.Screen name="customer/[id]" options={{ headerTitle: "Customers", title: "Customers" }} />

        </Tabs>
    )
}