// modules
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

// components
import Header from "./components/Header";

// Screens
import StartGameScreen from "./screens/StartGame.screen";
import GameScreen from "./screens/Game.screen";

export default function App() {
  const [numberUser, setNumberUser] = useState();

  const changeGameHandler = (number) => {
    if (!numberUser) {
      return setNumberUser(number);
    } else {
      return setNumberUser(null);
    }
  };

  let content = <StartGameScreen changeScreen={changeGameHandler} />;

  if (numberUser) {
    content = (
      <GameScreen userChoice={numberUser} changeScreen={changeGameHandler} />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Adivina un número" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
