import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Login from '../pages/login/Login.js';
import ComprehensiveAnalysis from '../pages/comprehensive_analysis/index';
import DamManagement from '../pages/dam_management/index';
import ReservoirOverview from '../pages/reservoir_overview/index';
import Setting from '../pages/setting/index';
import WaterNumMonitor from '../pages/water_num_monitor/index';
import WaterQualityMonitor from '../pages/water_quality_monitor/index';

import BaseStyle from '../css/BaseStyle';
import routeConfig from './RouterConfig';

export default [
  {
    Login : {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    ComprehensiveAnalysis : {
      screen: ComprehensiveAnalysis
    },
    DamManagement : {
      screen : DamManagement
    },
    ReservoirOverview : {
      screen : ReservoirOverview
    },
    Setting : {
      screen : Setting
    },
    WaterNumMonitor : {
      screen : WaterNumMonitor
    },
    WaterQualityMonitor : {
      screen : WaterQualityMonitor
    }
  },
  {
    initialRouteName: "Login",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal
    }),
    navigationOptions : routeConfig
  }
];
