import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image
} from 'react-native';
import { ButtonView, TextView,StatusView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import SupplyChart from './supplyChart.js';
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';

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
    this.state = {
      totalNum : '',
      dataList : []
    }
  }

  dealResData = (arr) => {
    let total = 0;
    arr.forEach((item,index) => {
      total += item.monthlyTotalSup;
      
    });

    this.setState({
      totalNum : total,
      dataList : arr
    })
  }


    render() {
      const { totalNum, dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>供水管理</TextView>
          
          <StatusView
              ref={(v) => {
                this.custom = v;
              }}
              getData={params => HttpUtils.get(Service.GetMonitorWatersupChart, params)}
              callBack={this.dealResData}
              errorFunc={() => this.setState({ enableButton: true })}
            >

          <View style={styles.info}>
             <TextView style={styles.infoLetter}>截止当前，陶岔渠首年度总供水量{totalNum}亿m³。</TextView>
          </View>

          <View style={styles.chart}>
             <SupplyChart dataList={dataList}></SupplyChart>
          </View>

          </StatusView>
        </View>
      );
    }
}
