import React from "react";
import { View, Text, StyleSheet } from "react-native";

//constant
import Colors from "../constants/colors";

const header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <Text style={{ ...styles.subtitleFont }}>{props.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center"
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "Raleway-Bold"
  },
  subtitleFont: {
    fontFamily: "Raleway-Medium"
  }
});

export default header;
