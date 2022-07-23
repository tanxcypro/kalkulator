// @flow

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  frame: {
    backgroundColor: "#efefef",
    width: 320,
    height: 320,
    alignItems: "stretch"
  },
  answer: {
    margin: 5,
    marginTop: 10,
    marginRight: 10,
    color: "#777",
    textAlign: "right",
    fontWeight: "100",
    height: 18,
    fontSize: 15
  },
  input: {
    height: 50,
    borderColor: "#bbb",
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    margin: 5,
    marginTop: 0
  },
  inputText: {
    fontSize: 30,
    color: "#222",
    fontWeight: "100"
  },
  buttonRow: {
    height: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderColor: "#bbb",
    borderWidth: 1,
    width: 72,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonText: {
    fontWeight: "100"
  },
  buttonAction: {
    backgroundColor: "#C9C9C9"
  },
  buttonActionTextLarge: {
    fontSize: 20,
    fontWeight: "300"
  },
  buttonActionText: {
    fontWeight: "300"
  },
  buttonMajor: {
    backgroundColor: "#376CE2"
  },
  buttonMajorText: {
    color: "white",
    fontWeight: "bold"
  }
});
