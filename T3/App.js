import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const App = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [result, setResult] = useState(0);
  const [allCalculations, setAllCalculations] = useState([]);

  const calcResult = (expression) => {
    if (expression === "+") {
      setResult(value1 + value2);
      setAllCalculations([
        ...allCalculations,
        `${value1} + ${value2} = ${value1 + value2}`,
      ]);
    } else if (expression === "-") {
      setResult(value1 - value2);
      setAllCalculations([
        ...allCalculations,
        `${value1} - ${value2} = ${value1 - value2}`,
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value1}
        onChangeText={(val) => setValue1(Number(val))}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value2}
        onChangeText={(val) => setValue2(Number(val))}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: 80,
          margin: 10,
        }}
      >
        <Button title=" + " onPress={() => calcResult("+")}></Button>
        <Button title=" - " onPress={() => calcResult("-")}></Button>
      </View>
      <Text style={{ marginTop: 80 }}>History</Text>
      <FlatList
        data={allCalculations}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    marginTop: 40,
  },
  input: {
    height: 40,
    width: 150,
    borderWidth: 1,
    margin: 4,
    padding: 4,
  },
});

export default App;
