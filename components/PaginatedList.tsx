import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from "react-native";

type PaginatedListProps<T> = {
  fetchData: (page: number) => Promise<{ items: T[]; hasMore: boolean }>;
  renderItem: ListRenderItem<T>;
  pageSize?: number;
  keyExtractor?: (item: T, index: number) => string;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
};

function PaginatedList<T>({
  fetchData,
  renderItem,
  pageSize = 10,
  keyExtractor = (_item, index) => index.toString(),
  ListEmptyComponent = <Text style={styles.empty}>No data found.</Text>,
  ListHeaderComponent,
}: PaginatedListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setLoading(true);
    try {
      const newItems = await fetchData(page);
      setData((prev) => [...prev, ...newItems.items]);
      setHasMore(newItems.items.length === pageSize);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, isLoading, hasMore, pageSize]);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={
        isLoading ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null
      }
      ListEmptyComponent={isLoading ? null : ListEmptyComponent}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});

export default PaginatedList;
