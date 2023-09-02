import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { HomePage } from "./src/views/HomeView";
import { globalStyles } from "./src/styles/styles";

export default function App() {
  return (
    <View style={styles.container}>
      <HomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(224,230,235)",
    alignItems: "center",
    justifyContent: "center",
  },
});
