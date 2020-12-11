import React, { Component } from "react";
import { View,Text, StyleSheet } from "react-native";
import { observer } from "mobx-react";
//import LinearGradient from "react-native-linear-gradient";
import BaseStyle from '../css/BaseStyle';
@observer
class TitleBar extends Component {
  render() {
    return (
      <View
        style={StyleSheet.flatten([
          style.defaultContainerStyle,
          this.props.containerStyle,
        ])}
      >
        {this.props.contentRender ? (
          this.props.contentRender()
        ) : (
          <Text
            style={StyleSheet.flatten([
              style.defaultTextStyle,
              this.props.textStyle,
            ])}
          >
            {this.props.title}
          </Text>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  defaultTextStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  defaultContainerStyle: {
    display: "flex",
    height: 60,
    elevation: 0,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor : BaseStyle.themeColor
  },
});

export default TitleBar;
