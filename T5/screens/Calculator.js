import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";

const Calculator = ({ navigation }) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [result, setResult] = useState(0);
  const [allCalculations, setAllCalculations] = useState([]);

  const calcResult = (expression) => {
    if (expression === "+") {
      const calcResult = value1 + value2;
      setResult(calcResult);
      setAllCalculations([
        ...allCalculations,
        `${value1} + ${value2} = ${calcResult}`,
      ]);
    } else if (expression === "-") {
      const calcResult = value1 - value2;
      setResult(calcResult);
      setAllCalculations([
        ...allCalculations,
        `${value1} - ${value2} = ${calcResult}`,
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
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button title=" + " onPress={() => calcResult("+")} />
          <Button title=" - " onPress={() => calcResult("-")} />
          <Button
            title="History"
            onPress={() =>
              navigation.navigate("History", {
                allCalculations: allCalculations,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 150,
    borderWidth: 1,
    margin: 4,
    padding: 4,
  },
});

export default Calculator;
