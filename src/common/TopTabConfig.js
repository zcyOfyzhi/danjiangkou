import { Dimensions } from 'react-native';
import BaseStyle from '../css/BaseStyle';

const TopTabConfig = {
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width,
  },
  swipeEnabled: false,
  lazy: false,
  optimizationsEnabled: true,
  backBehavior: false,
  upperCaseLabel: false,
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      height: 40,
      lineHeight: 40,
      padding: 0,
      margin: 0,
    },
    // activeTintColor: BaseStyle.themeColor,
    // inactiveTintColor: BaseStyle.textItemColor,
    indicatorStyle: { backgroundColor: BaseStyle.headerTintColor },
    style: {
      backgroundColor: BaseStyle.themeColor,
      height: 65,
      lineHeight: 65,
      justifyContent: 'flex-end',
      padding: 0,
      margin: 0,
    },
  },
  navigationOptions: {
    header: null,
  },
};
export default TopTabConfig;
