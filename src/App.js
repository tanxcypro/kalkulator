// TODO: add animation when answer is pressed

import React from "react";
import { Text, View } from "react-native";
import * as R from "ramda";

import createCalcLogic from "./controllers/createCalcLogic";
import Button from "./components/Button";
import ScrollableTextInput from "./components/ScrollableTextInput";

import styles from "./App.styles";
import config from "./App.config";

class App extends React.Component {
  calcLogic = createCalcLogic();

  state = {
    answer: this.calcLogic.answer,
    input: this.calcLogic.input,
    prevInput: this.calcLogic.prevInput,
    clear: this.calcLogic.clear
  };

  onButtonPress = (id) => {
    this.setState(this.calcLogic.action(id));
  };

  render() {
    const { input, prevInput, clear } = this.state;
    const buttonLayout = R.assocPath([0, 3], clear, config.buttonLayout);
    return (
      <View style={styles.container}>
        <View style={styles.frame}>
          <Text style={styles.answer}>{this.renderInput(prevInput, "")}</Text>
          <ScrollableTextInput
            style={styles.input}
            value={this.renderInput(input, "0")}
            textStyle={styles.inputText}
          />
          {buttonLayout.map(this.renderButtonRow)}
        </View>
      </View>
    );
  }

  renderInput = (input, defaultVal) => {
    if (R.isEmpty(input)) {
      return defaultVal;
    }

    const prettyInput = this.calcLogic.prettyInput(input);

    const mapper = R.addIndex(R.chain);
    const renderIds = mapper((id) => {
      // replacing id to label
      const { input, label } = config.buttons[id] || {};
      return input || label || id;
    });
    const renderSpaces = mapper((id, index, list) => {
      const { renderWithSpaces } = config.buttons[id] || {};
      if (renderWithSpaces) {
        // last operation shouldn't have space after it
        return index < list.length - 1 ? [" ", id, " "] : [" ", id];
      }
      return id;
    });
    const render = R.compose(R.join(""), renderIds, renderSpaces);
    return render(prettyInput);
  };

  renderAnswer = (answer) => {
    if (isNaN(answer)) {
      return "Error";
    }
    return answer;
  };

  renderButtonRow = (row, i) => {
    return (
      <View key={i} style={styles.buttonRow}>
        {row.map((buttonID, i) => {
          const data = config.buttons[buttonID];
          return (
            <Button
              id={buttonID}
              key={`button-${buttonID}`}
              style={data.style}
              text={data.label}
              textStyle={data.textStyle}
              onPress={this.onButtonPress}
            />
          );
        })}
      </View>
    );
  };
}

export default App;
