// modules
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

// components
import Header from "./components/Header";

// Screens
import StartGameScreen from "./screens/StartGame.screen";
import GameScreen from "./screens/Game.screen";

const fetchFonts = () => {
  // alows to load fonts
  return Font.loadAsync({
    "RobotoMono-Thin": require("./assets/fonts/RobotoMono-Thin.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf")
  });
};

export default function App() {
  const [numberUser, setNumberUser] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        /* needs to be a function with a promise return*/
        onFinish={() => setDataLoaded(true)}
        onError={err => console.error(err)}
      />
    );
  }

  const changeGameHandler = number => {
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
      <Header title="Adivina un número" subtitle={"y te dire tu suerte..."} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
