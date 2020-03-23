import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import ButtonSecondary from "../components/ButtonSecondary";

// Constants
import Colors from "../constants/colors";
import colors from "../constants/colors";
import defaultStyle from "../constants/default-style";
import ListElements from "../components/ListElements";

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

const calculateLuck = atempts => (100 - atempts) / 100;

const GameScreen = props => {
  const initialGuess = generateRandomNumber(100, 1, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [atemps, setAtempts] = useState(1);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  //! cambiar a false
  const [winState, setWinState] = useState(false);
  const [luck, setLuck] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(
    () => {
      if (currentGuess === props.userChoice && winState === false) {
        setWinState(true);
        //console.log("Number gues");
        setLuck(calculateLuck(atemps));
      }
    },
    /* Here goes the change state that triggers the use efect if it changes*/ [
      currentGuess
    ]
  );

  const newGuessHandler = direction => {
    //console.log(`presionaste ${direction}`);
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
      currentLow.current = currentGuess + 1;
    }
    const newNumber = generateRandomNumber(
      currentHigh.current,
      currentLow.current,
      currentGuess
    );
    setCurrentGuess(newNumber);
    setAtempts(atemps + 1);
    setPastGuesses(curPastGuesses => [newNumber, ...curPastGuesses]);
  };

  return (
    <View style={Styles.screen}>
      {winState === false ? (
        <>
          <Card style={{ width: "80%" }}>
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 10,
                marginBottom: 30
              }}
            >
              <Text style={{ ...Styles.fontNormal, ...defaultStyle.fontText }}>
                Intentos:
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  ...defaultStyle.fontSubtitle
                }}
              >
                {atemps}
              </Text>
            </View>
            <Text style={{ ...Styles.fontNormal, ...defaultStyle.fontText }}>
              Tú número es....
            </Text>
            <Text
              style={{
                fontSize: 70,
                backgroundColor: colors.secondary,
                textAlign: "center",
                width: "50%",
                position: "relative",
                left: "25%",
                borderRadius: 20,
                ...defaultStyle.fontSubtitle
              }}
            >
              {currentGuess}
            </Text>
            <View style={Styles.buttonContaine}>
              <View style={Styles.btn}>
                <ButtonSecondary onPress={newGuessHandler.bind(this, "lower")}>
                  <Ionicons
                    name="ios-remove-circle-outline"
                    size={30}
                    color={Colors.primary}
                  />
                </ButtonSecondary>
              </View>
              <View style={Styles.btn}>
                <ButtonSecondary
                  color={Colors.secondary}
                  onPress={newGuessHandler.bind(this, "higher")}
                >
                  <Ionicons
                    name="md-add-circle-outline"
                    size={30}
                    color={Colors.primary}
                  />
                </ButtonSecondary>
              </View>
            </View>
            <View>
              <ButtonSecondary
                onPress={props.changeScreen}
                style={{
                  backgroundColor: Colors.primary
                }}
                styleText={{
                  color: Colors.secondary,
                  fontFamily: "Raleway-Medium"
                }}
              >
                Salir
                <Ionicons name="md-exit" size={24} color={Colors.secondary} />
              </ButtonSecondary>
            </View>
          </Card>
          <ScrollView
            style={{
              marginTop: "20%",
              width: "70%",
              borderWidth: 4,
              borderColor: Colors.primary,
              borderRadius: 20,
              padding: 30,
              flexGrow: 1
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Raleway-Medium"
                }}
              >
                Historial de intentos
              </Text>
            </View>
            {pastGuesses.map(guess => (
              <ListElements
                key={guess}
                guess={guess}
                round={pastGuesses.length - pastGuesses.indexOf(guess)}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <Card style={{ marginVertical: 50 }}>
            <View style={{ padding: 50 }}>
              <Text
                style={{
                  ...Styles.centerText,
                  ...defaultStyle.fontTitle,
                  fontSize: 25
                }}
              >
                Ganaste!
              </Text>
              <View style={{ ...Styles.imageWinContainer }}>
                <Image
                  source={require("../assets/images/original.png")}
                  style={{ ...Styles.image }}
                  resizeMode="contain"
                />
                {/* <View>
                <Image
                  source={{
                    uri:
                      "https://i.ibb.co/yn2jcx6/montana-cubierta-nieve-sobre-nivel-nube-bandera-roja-cima-montana-cielo-azul-33800-188.jpg"
                  }}
                /> */}
              </View>
              <Text style={{ ...Styles.centerText, ...defaultStyle.fontText }}>
                Te tomó{" "}
                <Text
                  style={{
                    ...defaultStyle.fontSubtitle,
                    color: Colors.secondary
                  }}
                >
                  {atemps} {atemps === 1 ? "Intento" : "intentos"}
                </Text>
              </Text>
              <Text style={{ ...Styles.centerText, ...defaultStyle.fontText }}>
                Tu suerte es de:
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  backgroundColor: colors.secondary,
                  textAlign: "center",
                  width: "70%",
                  position: "relative",
                  alignSelf: "center",
                  borderRadius: 20,
                  marginVertical: 30,
                  ...defaultStyle.fontSubtitle
                }}
              >
                {luck}
              </Text>
              <View>
                <ButtonSecondary
                  onPress={props.changeScreen}
                  style={{ backgroundColor: Colors.primary }}
                >
                  Nuevo intento
                </ButtonSecondary>
              </View>
            </View>
          </Card>
        </>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "black"
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
  },
  centerText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 300
  },
  imageWinContainer: {
    borderWidth: 3,
    borderColor: Colors.secondary,
    borderRadius: 300,
    width: "100%"
  }
});

export default GameScreen;
