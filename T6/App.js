import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const App = () => {
  const [searchParam, setSearchParam] = useState("");
  const [meals, setMeals] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMeals = async () => {
    setLoading(true);
    const { data } = await axios.get(API_URL + searchParam);
    setLoading(false);
    if (!data.meals) {
      setErrorMsg("No meals found, try a different ingredient");
      setMeals([]);
      return;
    }
    setErrorMsg("");
    setMeals(data.meals);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchParam}
        onChangeText={setSearchParam}
      />
      <Button title="Find" onPress={fetchMeals} />
      {errorMsg && <Text style={{ marginTop: 10 }}>{errorMsg}</Text>}
      {loading && <ActivityIndicator size="large" />}
      <FlatList
        style={styles.list}
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View>
            <Text>{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{ uri: `${item.strMealThumb}/preview` }}
            />
            <View style={styles.separator} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    marginTop: 50,
    marginBottom: 10,
    width: 150,
    height: 50,
    padding: 5,
  },
  image: {
    height: 50,
    width: 50,
  },
  list: {
    margin: 10,
  },
  separator: {
    marginVertical: 4,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
