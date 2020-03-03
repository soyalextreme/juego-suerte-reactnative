import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import Card from "../components/Card";

// Constants
import Colors from "../constants/colors";
import colors from "../constants/colors";

const generateRandomNumber = (max, min, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const ranNum = Math.floor(Math.random() * (max - min)) + min;
  if (ranNum === exclude) {
    return generateRandomNumber(max, min, exclude);
  } else {
    return ranNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(100, 1, props.userChoice)
  );
  const [atemps, setAtempts] = useState(1);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const newGuessHandler = (direction) => {
    console.log(`presionaste ${direction}`);
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      return Alert.alert("No mientas!", "El juego sabe tu número verdadero", [
        { text: "Entendido", style: "destructive" }
      ]);
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const newNumber = generateRandomNumber(
      currentHigh.current,
      currentLow.current,
      currentGuess
    );
    setCurrentGuess(newNumber);
    setAtempts(atemps + 1);
  };

  return (
    <View style={Styles.screen}>
      <Card style={{ width: "80%" }}>
        <View
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            marginBottom: 30
          }}
        >
          <Text style={Styles.fontNormal}> Intentos:</Text>
          <Text style={{ textAlign: "center", fontSize: 25 }}>{atemps}</Text>
        </View>
        <Text style={Styles.fontNormal}> Tú número es.... </Text>
        <Text
          style={{
            fontSize: 70,
            backgroundColor: colors.secondary,
            textAlign: "center",
            width: "50%",
            position: "relative",
            left: "25%",
            borderRadius: 20
          }}
        >
          {currentGuess}
        </Text>
        <View style={Styles.buttonContaine}>
          <View style={Styles.btn}>
            <Button
              title="Menor"
              color={Colors.secondary}
              onPress={newGuessHandler.bind(this, "lower")}
            />
          </View>
          <View style={Styles.btn}>
            <Button
              title="Mayor"
              color={Colors.secondary}
              onPress={newGuessHandler.bind(this, "higher")}
            />
          </View>
        </View>
      </Card>
      <View style={{ bottom: -200 }}>
        <Button
          title="Salir"
          onPress={props.changeScreen}
          color={Colors.primary}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContaine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  btn: {
    width: 80
  },
  fontNormal: {
    textAlign: "center"
  }
});

export default GameScreen;
