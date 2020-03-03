import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...style.card, ...props.style }}>{props.children}</View>
  );
};

const style = StyleSheet.create({
  card: {
    shadowColor: "black",
    // ios
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    // elevation is for android
    elevation: 2
  }
});

export default Card;
