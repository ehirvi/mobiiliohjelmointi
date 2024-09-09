import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    const updatedList = list.concat(item);
    setList(updatedList);
    setItem("")
  };

  const clearList = () => {
    setList([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={item}
        onChangeText={(text) => setItem(text)}
      />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 50 }}>
        <Button title="Add" onPress={addItem} />
        <Button title="Clear" onPress={clearList} />
      </View>
      <Text style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
        Shoppinglist
      </Text>
      <FlatList data={list} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    margin: 20,
    padding: 4,
    borderWidth: 1,
  },
});
