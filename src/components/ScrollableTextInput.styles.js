// @flow

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
  },
  scrollView: {
    borderColor: "#bbb",
    borderWidth: 1,
    height: 50,
  },
  scrollViewContent: {
    height: 50,
    flowDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingRight: 5,
    textAlign: "right"
  },
  textSizerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: "lightgreen",
    opacity: 0
  },
  textSizer: {
    paddingRight: 5,
  }
});
