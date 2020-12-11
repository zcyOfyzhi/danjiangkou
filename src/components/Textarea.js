import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

class Textarea extends Component {
  render() {
    return (
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="请输入"
        multiline={true}
        {...this.props}
        style={StyleSheet.flatten([style.textarea, this.props.style || {}])}
      />
    );
  }
}

const style = StyleSheet.create({
  textarea: {
    height: 60,
    padding: 10,
    width: "100%",
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
});

export default Textarea;
