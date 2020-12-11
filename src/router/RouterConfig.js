import BaseStyle from '../css/BaseStyle';

const RouterConfig = {
  headerMode: 'float',
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: true,
    headerTitleStyle: BaseStyle.headerTitleStyle,
    headerStyle: BaseStyle.headerStyle,
    headerTintColor: BaseStyle.headerTintColor,
    headerBackTitle: null,
  },
};
export default RouterConfig;
