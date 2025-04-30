import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import api from "../../../services/api/axiosInstance";
import PaginatedList from "../../../components/PaginatedList";

export default function MedicineScreen() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        setList(res.data);
      } catch (err: any) {
        Alert.alert("error while fetch custromers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>🏷️ {item.category}</Text>
      <Text style={styles.detail}>🏢 {item.manufacturer}</Text>
    </View>
  );

  const fetchCustomers = async (page: number, limit = 10) => {
    const response = await api.get("/products", {
      params: { page, limit },
    });

    return {
      items: response.data.data,
      hasMore: response.data.pagination.next,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicines List</Text>

      <PaginatedList fetchData={fetchCustomers} renderItem={renderItem} />
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
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  balance: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#007BFF",
  },
});
