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
import DamChart from './damChart.js';


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
    height : 260,
    display : 'flex',
    flexDirection : 'row',
  },
  left : {
    flex : 1,
  },
  right : {
    width : 120,
    marginRight : 20,
  },
  item : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
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
  }

  
});

export default class ReserColumn extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#007DFF', '#9446E7', '#EF3737', '#FFAF2A', '#AE1616', '#DCD535', '#4BD754', '#1FC4D4', '#3539DF'],
      dataList : [
        {value: 163,name: '温度计' },
        {value: 32,name: '三维变形记'},
        {value: 16,name: '锚杆应力计'},
        {value: 42,name: '裂缝计'},
        {value: 6,name: '伸缩计'},
        {value: 100,name: '渗压计'},
        {value: 84,name: '应变计'},
        {value: 100,name: '钢筋计'},
        {value: 28,name: '测压管'}
      ]
    }
  }


    render() {
      const {color,dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>坝区管理</TextView>
           
          <View style={styles.main}>
            <View style={styles.left}>
              <DamChart></DamChart>
            </View>
            {/* <View style={styles.right}>
                {
                    dataList.map((item = {},index) => (
                       <View style={styles.item} key={`item_${index}`}>
                          <View style={styles.itemLeft}>
                              <TextView style={[styles.circle, { backgroundColor: `${color[index]}` }]}></TextView>
                              <TextView>{item.name}</TextView>
                          </View>

                          <TextView style={styles.itemRight}>{item.value}</TextView>

                       </View>
                      ))
                }

            </View> */}

          </View>

        </View>
      );
    }
}
