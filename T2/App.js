import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const App = () => {
  const [number, setNumber] = useState(undefined);
  const [userGuess, setUserGuess] = useState(undefined);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [message, setMessage] = useState("Guess a number between 1-100");

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = () => {
    const newGuesses = totalGuesses + 1;
    setTotalGuesses(newGuesses);
    if (userGuess === number) {
      Alert.alert(`You guessed the number in ${totalGuesses} guesses`);
    } else if (userGuess < number) {
      setMessage(`Your guess ${userGuess} is too low`);
    } else {
      setMessage(`Your guess ${userGuess} is too high`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userGuess}
        onChangeText={(val) => setUserGuess(Number(val))}
      />
      <Button title="Make a guess" onPress={handleGuess} />
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
    height: 40,
    width: 100,
    padding: 4,
    margin: 10,
  },
});

export default App;
