import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>This is home page</Text>
      <Link href="/login">Click me</Link>
      <Pressable onPress={() =>
        router.push("/customer/1")
      }>
        <Text>Goto user 2</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, // full screen
    backgroundColor: "#FFF",
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
  },
});
