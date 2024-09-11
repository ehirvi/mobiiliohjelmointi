import { FlatList, Text, StyleSheet, View } from "react-native";

const History = ({ route }) => {
  const { allCalculations } = route.params;
  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList
        data={allCalculations}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
});

export default History;
