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
import Chart from './Chart.js';


const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
  },
  BgTitle : {
    fontSize : 20,
    color : '#141F2E',
    margin : 20,
    marginBottom : 10,
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
    height : 320,
    display : 'flex',
  },
  top : {
    flex : 1,
  },
  bottom : {
    height : 60,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    flexWrap : 'wrap',
    paddingLeft : 20,
    paddingRight : 20,
  },
  item : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    flexWrap : 'wrap',
    marginBottom: 8,
    
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
  },
  subTitle : {
    width : '100%',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'column',
    marginBottom :10,
  }

  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#409EFF', '#FF5050', '#FFC30F', '#67C23A'],
      dataList : [
        {value: 69,name: '无问题' },
        {value: 12,name: '有问题'},
        {value: 10,name: '待处理'},
        {value: 9,name: '已处理'}
      ]
    }
  }


    render() {
      const {color,dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>巡查上报</TextView>
          <View style={styles.subTitle}>
              <TextView style={{fontSize : 16,color : '#303133'}}>当前状态统计</TextView>
          </View>
          
          <View style={styles.main}>
            <View style={styles.top}>
              <Chart></Chart>
            </View>
            <View style={styles.bottom}>
                {
                    dataList.map((item = {},index) => (
                       <View style={styles.item} key={`item_${index}`}>
                          <View style={styles.itemLeft}>
                              <TextView style={[styles.circle, { backgroundColor: `${color[index]}` }]}></TextView>
                              <TextView>{item.name}：</TextView>
                          </View>

                          <TextView style={styles.itemRight}>{item.value}</TextView>

                       </View>
                      ))
                }

            </View>

          </View>

        </View>
      );
    }
}
