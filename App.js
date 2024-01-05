import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { HomePage } from "./src/views/HomeView";
import { globalStyles } from "./src/styles/styles";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <HomePage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
