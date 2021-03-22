import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Dimensions
} from 'react-native';
import { ButtonView, TextView,StatusView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import DamChart from './damChart.js';
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';
const { width,height } = Dimensions.get('window');

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
  },
  info : {
    padding : 15,
  },
  infoLetter : {
    fontSize : 12,
    color : '#333',
    lineHeight : 24,
  },
  main: {
    // display : 'flex',
    // flexDirection : 'column',
  },
  top : {
    height : 260,
  },
  bottom : {
    width : '100%',
    marginLeft : 20,
    marginRight : 20,
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    alignItems : 'center',
  },
  item : {
    width : (width - 50) / 3,
    marginBottom : 10,
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    
  },
  itemLeft : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    
  },
  circle : {
    width : 8,
    height : 8,
    borderRadius : 8,
    backgroundColor : '#3385FF',
    marginRight : 5,
  }

  
});

export default class ReserColumn extends Component {


  constructor(props) {
    super(props);

    this.state = {
      dataList : []
    }
  }

  dealResData = (arr) => {
    this.setState({
      dataList : arr
    })
  }



    render() {
      const {dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>坝区管理</TextView>

          <StatusView
              ref={(v) => {
                this.custom = v;
              }}
              getData={params => HttpUtils.get(Service.GetMonitorTreemodeltotal, params)}
              callBack={this.dealResData}
              errorFunc={() => this.setState({ enableButton: true })}
            >
 
          <View style={styles.main}>
            <View style={styles.top}>
              <DamChart dataList={dataList}></DamChart>
            </View>
            
            <View style={styles.bottom}>
                {
                    dataList.map((item = {},index) => (
                       <View style={styles.item} key={`item_${index}`}>
                          <View style={styles.itemLeft}>
                              {/* <TextView style={[styles.circle]}></TextView> */}
                              <TextView>{item.name}：</TextView>
                          </View>

                          <TextView style={styles.itemRight}>{item.total}</TextView>

                       </View>
                      ))
                }

            </View>

          </View>

          </StatusView>

        </View>
      );
    }
}
