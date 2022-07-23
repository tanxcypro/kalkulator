/**
 * TextInput the contents of which can be scrolled horizontally
 * @flow
 */

import * as React from "react";
import { ScrollView, TextInput, Text, View } from "react-native";
import PropTypes from "prop-types";

import styles from "./ScrollableTextInput.styles";

class AutogrowTextInput extends React.PureComponent {
  state = {
    textWidth: 0,
    scrollWidth: 0
  };

  onChange = event => {
    const { text } = event.nativeEvent;
    this.setState(() => ({ text }));
  };

  onTextLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState(
      () => ({ textWidth: width }),
      () => {
        this.scroll.scrollToEnd({ animated: false });
      }
    );
  };

  onScrollLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState(() => ({ scrollWidth: width }));
  };

  render() {
    const { textWidth, scrollWidth } = this.state;
    const { style, value, textStyle } = this.props;
    const contentWidth = Math.max(scrollWidth, textWidth);
    return (
      <View style={[styles.container]}>
        <ScrollView
          ref={r => {
            this.scroll = r;
          }}
          onLayout={this.onScrollLayout}
          style={[styles.scrollView, style]}
          contentContainerStyle={[
            styles.scrollViewContent,
            { width: contentWidth }
          ]}
          horizontal
        >
          <TextInput
            onChange={this.onChange}
            editable={false}
            style={[styles.textInput, textStyle, { width: contentWidth }]}
            value={value}
          />
          <ScrollView
            style={styles.textSizerContainer}
            pointerEvents="none"
            horizontal
          >
            <Text
              style={[styles.textSizer, textStyle]}
              onLayout={this.onTextLayout}
              numberOfLines={1}
            >
              {value}
            </Text>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default AutogrowTextInput;

AutogrowTextInput.propTypes = {
  style: PropTypes.any,
  textStyle: PropTypes.any,
  value: PropTypes.string
};
