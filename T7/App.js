import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import services from "./services";
// import data from "./rates.json";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("€");
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [exhangeRates, setExhangeRates] = useState([]);
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      // Free API key ran out very quickly, so I had to use identically formatted local data instead...
      // But for anyone else with a working API key, this will work normally.
      const data = await services.getExhangeRates();
      setCurrencyCodes(Object.keys(data.rates));
      setExhangeRates(data.rates);
      setLoading(false);
    };
    fetchRates();
  }, []);

  const handleText = (text) => {
    if (!isNaN(text)) {
      setInput(text);
    }
  };

  const convertCurrency = () => {
    const res = input / exhangeRates[selectedCurrency];
    setResult(`${res} €`);
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {!loading && (
        <View>
          <Text style={{ fontSize: 20, alignSelf: "center", marginBottom: 10 }}>
            {result}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={(text) => handleText(text)}
              keyboardType="numeric"
            />
            <Picker
              style={styles.picker}
              selectedValue={selectedCurrency}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCurrency(itemValue)
              }
            >
              {currencyCodes.map((c) => (
                <Picker.Item
                  style={{ fontSize: 15 }}
                  key={c}
                  label={c}
                  value={c}
                />
              ))}
            </Picker>
          </View>
          <Button title="Convert" onPress={convertCurrency} />
        </View>
      )}
      <StatusBar style="auto" />
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
    borderWidth: 1,
    padding: 4,
    width: 110,
    height: 40,
  },
  picker: {
    borderWidth: 10,
    borderColor: "black",
    width: 120,
    height: 50,
  },
});

export default App;
