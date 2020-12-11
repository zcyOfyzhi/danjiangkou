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
const { width } = Dimensions.get(`window`);
import ImageView from "../../../common/ImageView";
import Service from '../../../base/Service';

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    marginTop: 0,
    marginBottom: 40,
  },
  BgTitle : {
    fontSize : 20,
    color : '#141F2E',
    margin : 20,
  },
  main : {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    
  },
  item : {
    marginBottom: 10,
  },
  letter : {
    fontSize : 16,
    color : '#333'
  },
  tm : {
    fontSize : 10,
    color : '#999999'
  }
 

  
});

export default class NewsInfo extends Component {


  constructor(props) {
    super(props);

    this.state = {
      dataList : [
        {
          label : '水库开展鱼类增殖放流活动',
          tm : '2020年11月16日'
        },
        {
          label : '今日丹江口水库水位已涨至160.06米今年首次超汛限水位超汛限水位水位超汛限水位',
          tm : '2020年11月16日'
        },
        {
          label : '83亿立方米!丹江口水库向北方供水量创历史',
          tm : '2020年11月16日'
        },
        {
          label : '丹江口水库今年首次开闸泄洪',
          tm : '2020年11月16日'
        },
        {
          label : '今日丹江口水库水位已涨至160.06米今年首次超汛限水位',
          tm : '2020年11月16日'
        }
      ]
    }
  }


    render() {
      const {dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>新闻动态</TextView>
          
          <View style={styles.main}>
            {  
                dataList.map((item = {},index) => (
                  <ButtonView style={styles.item} key={`item_${index}`}>
                        <TextView style={styles.letter}>{item.label}</TextView>
                        <TextView style={styles.tm}>{item.tm}</TextView>
                    

                  </ButtonView>
                ))
            }
          </View>

          

        </View>
      );
    }
}
