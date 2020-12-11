import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../css/BaseStyle';
import Circle from '../../common/Circle.js';


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
    width : '100%',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
  },
  top : {
    
  },
  bottom : {
    width : '60%',
    height : 40,
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
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

export default class DeviceType extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#3385FF', '#33C9A7'],
      dataList : [
        {value: `96%`,name: '温度' },
        {value: `4%`,name: '压力'}
      ]
    }
  }


    render() {
      const {color,dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>设备类型统计</TextView>
           
          <View style={styles.main}>
            <View style={styles.top}>
               <Circle 
                  key={`circle_two`} 
                  mount={120} 
                  warn={15} 
                  name={`test`}
                  tintColor = {`#3385FF`}
                  backgroundColor = {`#33C9A7`}
                  textOne = {`温度`}
                  textTwo = {`压力`}
                />
            </View>
            <View style={styles.bottom}>
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

            </View>

          </View>

        </View>
      );
    }
}
