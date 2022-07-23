// @flow

import * as React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./Button.styles";

class Button extends React.PureComponent {
  onPress = () => {
    this.props.onPress(this.props.id);
  };

  render() {
    const { style, text, textStyle, id } = this.props;
    return (
      <TouchableHighlight onPress={this.onPress}>
        <View style={[styles.button, style]}>
          <Text style={[styles.text, textStyle]}>{text || id}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Button;

Button.propTypes = {
  style: PropTypes.any,
  textStyle: PropTypes.any,
  text: PropTypes.string,
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};
