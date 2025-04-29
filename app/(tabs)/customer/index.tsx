import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const customers = [
  { id: "1", name: "Alice Johnson", mobile: "98789789" },
  { id: "2", name: "Bob Smith", mobile: "98789789" },
  { id: "3", name: "Charlie Davis", mobile: "98789789" },
  // Add more customer objects as needed
];

export default function CustomersScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.mobile}</Text>
      {/* <Text style={styles.itemText}>{item.name}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers List</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});
