/**
 * Static config of the buttons
 */
import styles from "./App.styles";

const {
  buttonAction,
  buttonActionText,
  buttonActionTextLarge,
  buttonMajor,
  buttonMajorText
} = styles;

export default {
  buttonLayout: [
    ["answer", "(", ")", "clear"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
  ],
  buttons: {
    answer: {
      style: buttonAction,
      textStyle: buttonActionText,
      label: "Ans"
    },
    "(": {
      style: buttonAction,
      textStyle: buttonActionText
    },
    ")": {
      style: buttonAction,
      textStyle: buttonActionText
    },
    ac: {
      style: buttonAction,
      textStyle: buttonActionText,
      label: "AC"
    },
    ce: {
      style: buttonAction,
      textStyle: buttonActionText,
      label: "CE"
    },
    "*": {
      style: buttonAction,
      textStyle: buttonActionTextLarge,
      label: "×",
      renderWithSpaces: true
    },
    "/": {
      style: buttonAction,
      textStyle: buttonActionTextLarge,
      label: "÷",
      renderWithSpaces: true
    },
    "-": {
      style: buttonAction,
      textStyle: buttonActionTextLarge,
      label: "−",
      input: "-",
      renderWithSpaces: true,
      canBeUnary: true
    },
    "+": {
      style: buttonAction,
      textStyle: buttonActionTextLarge,
      label: "+",
      input: "+",
      renderWithSpaces: true
    },
    "=": {
      style: buttonMajor,
      textStyle: buttonMajorText,
      label: "＝",
      renderWithSpaces: true
    },
    "0": {},
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {},
    ".": {}
  }
};
