import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import routerConfig from "./src/router";
import { Provider } from "mobx-react";
import RootStore from "./src/store";
import NavigationService from "./src/script/NavigationService";
import { http } from "./src/script/utils";

const AppContainer = StackNavigator(...routerConfig);

export default class App extends Component {
  constructor() {
    super();
    this.store = new RootStore();
  }

  componentDidMount() {
    http("/dic/constant/type", {}).then(({ data, code }) => {
      if (code == 200) {
        this.store.dict.setProblemType(
          data.sort((a, b) => a.typeCode - b.typeCode)
        );
        console.log("!!!!!! ", this.store.dict.problemType);
      } else {
        this.store.dict.setProblemType([]);
      }
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer ref={ref => NavigationService.setNav(ref)} />
      </Provider>
    );
  }
}
