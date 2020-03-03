import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Keyboard } from "react-native";

// own components
import Card from "../components/Card";
import Input from "../components/Input";
// constants styles
import Colors from "../constants/colors";

const StartGameScreem = (props) => {
  // STATE
  const [enteredValue, setEnteredValue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/, ""));
    console.log(enteredValue);
    //console.log("cambiand el estado");
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirm(false);
    //console.log("borrando el input");
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue);
    if (!enteredValue || choosenNumber <= 0 || choosenNumber > 99) {
      // console.log("todo mal");
      Alert.alert("Número no válido!!", "Ingresa un número ente 1 y 99 :D", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler }
      ]);
      return setConfirm(false);
    }
    // console.log("todo bien");
    Keyboard.dismiss();
    setConfirm(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
  };

  let confirmPopper;

  if (confirm && selectedNumber !== NaN) {
    confirmPopper = (
      <Card style={styles.cardConfirm}>
        <Text style={{ ...styles.font, color: Colors.secondary }}>
          Número Elegido:
        </Text>
        <Text style={{ ...styles.font, fontSize: 40 }}>{selectedNumber}</Text>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginVertical: 20
          }}
        >
          <View style={{ width: "50%" }}>
            <Button
              color={Colors.secondary}
              title="Start Game!!"
              onPress={props.changeScreen(selectedNumber)}
            />
          </View>
        </View>
      </Card>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Nueva Partida!!</Text>
      <Card style={styles.inputContainer}>
        <Text> Selecciona un Número</Text>
        <Input
          blurOnSubmit
          autoCapialize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          style={styles.input}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={styles.btnContainer}>
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title="Borrar"
              onPress={() => {
                resetInputHandler();
              }}
            />
          </View>
          <View style={Colors.secondary}>
            <Button
              title="Confirmar"
              onPress={confirmInputHandler}
              color={Colors.secondary}
            />
          </View>
        </View>
      </Card>
      {confirmPopper}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  cardConfirm: {
    width: "60%",
    marginTop: 20,
    padding: 10
  },
  font: {
    textAlign: "center"
  }
});

export default StartGameScreem;
