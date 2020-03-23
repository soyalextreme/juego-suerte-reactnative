import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//! constants
import Colors from "../constants/colors";

const ButtonSecondary = props => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={{ ...styles.textButton, ...props.styleText }}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 10,
    // ios
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26
  },
  textButton: {
    color: "white",
    fontFamily: "RobotoMono-Thin",
    fontSize: 12,
    shadowColor: "black",
    alignSelf: "center"
  }
});

export default ButtonSecondary;
