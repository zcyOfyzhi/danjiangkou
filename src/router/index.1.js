import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from '../pages/login/Login.js';
import ComprehensiveAnalysis from '../pages/comprehensive_analysis/index';
import RouterConfig from './RouterConfig';

const AppNavigator = createStackNavigator({
  Login : {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  ComprehensiveAnalysis : {
    screen: ComprehensiveAnalysis
  }
},RouterConfig);

export default AppNavigator;


