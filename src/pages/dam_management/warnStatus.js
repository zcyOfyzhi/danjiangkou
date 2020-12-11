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
import BaseStyle from '../../css/BaseStyle';
import Circle from '../../common/Circle.js';
const window = Dimensions.get('window');
const screenWidth =  window.width;


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
  },
  bottomTwo : {
    borderTopColor : '#EBEBEB',
    borderTopWidth : 1,
    marginLeft : 20,
    marginRight : 20,
    width : screenWidth - 100,
    paddingTop : 30,
    marginTop : 20,
    marginBottom : 30,
  },
  bottomItem : {
    backgroundColor : '#F6F6F6',
    marginBottom : 6,
    paddingTop : 8,
  },
  itemTop : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    paddingLeft : 10,
    paddingRight : 10,
    marginBottom : 8,
  },
  itemBottom : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    paddingLeft : 10,
    paddingRight : 10,
    marginBottom : 8,
  },
  textOne : {
    color : '#FF5050',
    backgroundColor : '#F6E4E4',
    padding : 3,
  },
  textTwo : {
    color : '#FF5050',
  }

  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#3385FF', '#FF6962'],
      dataList : [
        {value: `96%`,name: '已处理' },
        {value: `4%`,name: '未处理'}
      ]
    }
  }


    render() {
      const {color,dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>预警处理状态</TextView>
           
          <View style={styles.main}>
            <View style={styles.top}>
               <Circle 
                  key={`circle_one`} 
                  mount={120} 
                  warn={15} 
                  name={`test`}
                  tintColor = {`#3385FF`}
                  backgroundColor = {`#FF6962`}
                  textOne = {`已处理`}
                  textTwo = {`未处理`}
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
            
            <View style={styles.bottomTwo}>
                <View style={styles.bottomItem}>
                    <View style={styles.itemTop}>
                        <TextView>1#温度监测点</TextView>
                        <TextView style={styles.textOne}>未处理</TextView>
                    </View>

                    <View style={styles.itemBottom}>
                        <TextView style={styles.textTwo}>温度预警</TextView>
                        <TextView>07.15 12:30</TextView>
                    </View>
                </View>

                <View style={styles.bottomItem}>
                    <View style={styles.itemTop}>
                        <TextView>1#温度监测点</TextView>
                        <TextView style={styles.textOne}>未处理</TextView>
                    </View>

                    <View style={styles.itemBottom}>
                        <TextView style={styles.textTwo}>温度预警</TextView>
                        <TextView>07.15 12:30</TextView>
                    </View>
                </View>

                <View style={styles.bottomItem}>
                    <View style={styles.itemTop}>
                        <TextView>1#温度监测点</TextView>
                        <TextView style={styles.textOne}>未处理</TextView>
                    </View>

                    <View style={styles.itemBottom}>
                        <TextView style={styles.textTwo}>温度预警</TextView>
                        <TextView>07.15 12:30</TextView>
                    </View>
                </View>

          </View>

            
          </View>

        </View>
      );
    }
}
