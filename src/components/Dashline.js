import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Dashline extends Component {
  render() {
    const lineWidth = this.props.lineWidth || 20;
    const gapWidth = this.props.gapWidth || 5;
    const width = this.props.width || 1000;
    const color = this.props.color || "black";

    const lineArr = Array.from(
      new Array(Math.ceil(width / (lineWidth + gapWidth))),
      (v, i) => i
    );

    return (
      <View style={StyleSheet.flatten([this.props.style, style.container])}>
        {lineArr.map((v, i) => {
          return (
            <Text
              key={`dash${i}`}
              style={StyleSheet.flatten([
                style.lineItem,
                {
                  marginRight: gapWidth,
                  width: lineWidth,
                  backgroundColor: color,
                },
              ])}
            ></Text>
          );
        })}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 1,
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    overflow: "hidden",
    width: "100%",
  },
  lineItem: {
    flex: 1,
    height: 1,
  },
});

export default Dashline;
