import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import { observable, computed, action, reaction } from "mobx";
import Icon from "react-native-vector-icons/FontAwesome";

// props
// initValue 可空 默认选中项
// mode 排列方式 可空 水平(horizontal)或者竖直(vertical) 默认horizontal
// allowClear 再次点击选中项 是否取消清空 单选下有用 默认true
// multiple 是否多选 可空 默认false 多选下 选中项为数组
// checkData checkBox数组 []:string|[]:{label,key}
// iconName 未选中项图标名称 默认circle-o (图标来自FontAwesome)
// activeIconName 选中项图标名称 默认check-circle
// iconStyle 未选中项图标样式
// activeIconStyle 选中项图标样式
// labelStyle 未选中项文字样式
// activeLableStyle 选中项文字样式
// onChange 选中项发生变化的回调

@observer
class CheckBoxGroup extends Component {
  @observable active = this.props.initValue;

  @computed get mode() {
    return this.props.mode || "horizontal";
  }

  @computed get checkData() {
    return this.props.checkData.map(v => {
      return typeof v === "string"
        ? { key: v, label: v }
        : { key: v.key != undefined ? v.key : v.label, label: v.label };
    });
  }

  @computed get allowClear() {
    return this.props.allowClear || true;
  }

  @computed get multiple() {
    return this.props.multiple || false;
  }

  @computed get activeIcon() {
    return this.props.activeIconName || "check-circle";
  }

  @computed get iconName() {
    return this.props.iconName || "circle-o";
  }

  @computed get activeIconStyle() {
    return this.props.activeIconStyle || style.activeIconStyle;
  }

  @computed get iconStyle() {
    return this.props.iconStyle || style.iconStyle;
  }

  @computed get activeLabelStyle() {
    return this.props.activeLabelStyle || style.activeLabelStyle;
  }

  @computed get labelStyle() {
    return this.props.labelStyle || style.labelStyle;
  }

  initValueWatcher = reaction(
    () => this.props.initValue,
    val => {
      this.active = val;
    }
  );

  activeWatcher = reaction(
    () => this.active,
    val => {
      console.log("!!!!!!", this.props.onChange);
      if (this.props.onChange && typeof this.props.onChange === "function") {
        console.log("?????");
        this.props.onChange(val);
      }
    }
  );

  isCheck(v) {
    return this.multiple
      ? (this.active || []).indexOf(v.key) !== -1
      : v.key === this.active;
  }

  @action
  setActive(v) {
    if (this.multiple) {
      this.active = this.active || [];
      let index = this.active.indexOf(v.key);
      if (index === -1) {
        this.active.push(v.key);
      } else {
        this.active.splice(index, 1);
      }
    } else {
      this.active =
        this.allowClear && v.key === this.active ? undefined : v.key;
    }
  }

  render() {
    return (
      <View style={style[this.mode]}>
        {this.checkData.map(v => {
          return (
            <TouchableWithoutFeedback
              onPress={() => this.setActive(v)}
              key={v.key}
            >
              <View style={style[[this.mode] + "CheckItem"]}>
                <Icon
                  name={this.isCheck(v) ? this.activeIcon : this.iconName}
                  size={16}
                  style={StyleSheet.flatten([
                    style.iconBasicStyle,
                    this.isCheck(v) ? this.activeIconStyle : this.iconStyle
                  ])}
                />
                <Text
                  style={StyleSheet.flatten([
                    style.labelBasicStyle,
                    this.isCheck(v) ? this.activeLabelStyle : this.labelStyle
                  ])}
                >
                  {v.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
}

const style = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    overflow: "hidden"
  },
  vetical: {
    overflow: "hidden"
  },
  horizontalCheckItem: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  veticalCheckItem: {
    marginBottom: 5,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconBasicStyle: {
    marginRight: 5
  },
  iconStyle: {
    color: "#ccc"
  },
  activeIconStyle: {
    color: "#4569ff"
  },
  labelBasicStyle: {
    fontSize: 16
  },
  labelStyle: {
    color: "#333"
  },
  activeLabelStyle: {
    color: "#4569ff"
  }
});

export default CheckBoxGroup;
