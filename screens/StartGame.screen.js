import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Keyboard,
  Image
} from "react-native";

// own components
import Card from "../components/Card";
import Input from "../components/Input";
// constants styles
import Colors from "../constants/colors";
import ButtonSecondary from "../components/ButtonSecondary";

const StartGameScreem = props => {
  // STATE
  const [enteredValue, setEnteredValue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/, ""));
    //console.log(enteredValue);
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
      <Text style={{ ...styles.title, color: Colors.secondary, marginTop: 50 }}>
        Nueva Partida!!
      </Text>
      <Card style={styles.inputContainer}>
        <Text style={{ fontFamily: "RobotoMono-Thin" }}>
          Selecciona un Número
        </Text>
        <Input
          blurOnSubmit
          autoCapialize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          style={styles.input}
          onChangeText={numberInputHandler}
          value={enteredValue}
          style={{ ...styles.fontButton }}
        />
        <View style={styles.btnContainer}>
          <View style={styles.button}>
            <ButtonSecondary onPress={resetInputHandler}>
              Borrar
            </ButtonSecondary>
          </View>
          <View style={{ ...Colors.secondary, ...styles.button }}>
            <ButtonSecondary
              onPress={confirmInputHandler}
              color={Colors.secondary}
              style={{ backgroundColor: Colors.primary }}
            >
              Aceptar
            </ButtonSecondary>
          </View>
        </View>
      </Card>
      <View style={{ ...styles.imageWinContainer }}>
        <Image
          source={require("../assets/images/original.png")}
          style={{ ...styles.image }}
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
      {confirmPopper}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "black"
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
    alignItems: "center",
    marginTop: 50
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Raleway-Medium"
  },
  button: {
    width: "45%"
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
  },
  fontButton: {
    fontFamily: "Raleway-Medium",
    fontSize: 80,
    color: Colors.primary,
    height: 80
  },
  image: {
    alignSelf: "center",
    width: "200%",
    height: 700,
    borderRadius: 300
  },
  imageWinContainer: {
    width: "100%"
  }
});

export default StartGameScreem;
