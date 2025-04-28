import { StyleSheet, Text, View } from "react-native"

export default function UserPage (){
    return (
        <View style={styles.container}>
            <Text>this is user page </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full screen
    backgroundColor: "#FFF",
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
  },
});