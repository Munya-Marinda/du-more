import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { HomePage } from "./src/views/HomeView";
import ManualTest from "./src/components/ManualTest";

export default function App() {
  //
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <HomePage />
      {/* <ManualTest /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
