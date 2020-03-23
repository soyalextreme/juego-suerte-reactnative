import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { Octicons } from "@expo/vector-icons";

const ListElements = ({ guess, round }) => (
  <>
    <View style={{ ...styles.view }}>
      <Text
        style={{
          ...styles.fontNormal,
          fontFamily: "Raleway-Medium",
          color: Colors.primary
        }}
      >
        <Octicons name="checklist" /> {"  "}
        Numero {round}
      </Text>
      <Text style={{ ...styles.fontNormal }}>{guess}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center"
  },
  fontNormal: {
    color: Colors.secondary,
    fontFamily: "RobotoMono-Thin",
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 10,
    marginVertical: 10
  },
  header: {
    color: Colors.primary,
    fontFamily: "Raleway-Bold",
    fontSize: 20
  }
});

export default ListElements;
