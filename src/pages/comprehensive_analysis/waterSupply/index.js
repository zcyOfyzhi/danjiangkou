import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import SupplyChart from './supplyChart.js';

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    marginTop: 0,
  },
  BgTitle : {
    fontSize : 20,
    color : '#141F2E',
    margin : 20,
    marginBottom : 0,
  },
  info : {
    padding : 15,
    paddingTop : 0,
  },
  infoLetter : {
    fontSize : 12,
    color : '#333',
    lineHeight : 24,
  },
  chart: {
    height : 200,
  }
  
});

export default class ReserColumn extends Component {


  constructor(props) {
    super(props);
  }


    render() {
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>供水管理</TextView>
          <View style={styles.info}>
             <TextView style={styles.infoLetter}>截止当前，陶岔渠首年度总供水量6.30亿m³。</TextView>
          </View>

          <View style={styles.chart}>
             <SupplyChart></SupplyChart>
          </View>
        </View>
      );
    }
}
