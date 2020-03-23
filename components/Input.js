import React from "react";
import { TextInput, StyleSheet } from "react-native";

//! constants
import Colors from "../constants/colors";

const Input = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 4,
    marginVertical: 10
  }
});

export default Input;
