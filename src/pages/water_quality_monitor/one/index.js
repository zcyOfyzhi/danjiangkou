import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Dimensions
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import Chart from './Chart.js';

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    paddingBottom : 20,
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
    
  },
  top : {
    height : 320,
  },
  bottom : {
    paddingLeft : 40,
    paddingRight : 40,
    marginTop : -40,
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    justifyContent : 'center',
    alignItems : 'center',
  },
  item : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'center',
    marginBottom: 12,
    width : (width - 80) / 3,
    
  },
  itemLeft : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    marginRight : 20,
    
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
    marginBottom :10,
    paddingLeft : 20,
  },
  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#00B0FF', '#00FF0C', '#FFF200', '#FFA614','#FF3900', '#8A050C'],
      dataList : [
        {value: 7,name: 'I类水' },
        {value: 6,name: 'II类水'},
        {value: 5,name: 'III类水'},
        {value: 4,name: 'IV类水'},
        {value: 2,name: 'V类水' },
        {value: 1,name: '劣V类水'}
      ]
    }
  }


    render() {
      const {color,dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>水质比例图</TextView>
           
          
          
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
