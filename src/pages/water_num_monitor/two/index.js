import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Dimensions,
  Text,
  DeviceEventEmitter
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
   marginTop : 40,
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
    marginTop : 20,
  },
  item : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    marginBottom: 12,
    
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
    marginBottom :10,
    paddingLeft : 20,
  },
  list : {
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    justifyContent : 'center',
    alignItems : 'center',
  },
  listItem : {
    width : (width - 50) / 3,
    marginBottom : 20,
    
  },
  itemTop : {
    display : 'flex',
    justifyContent : 'center',
    flexDirection : 'row',
  },
  itemBtm : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center',
  }

  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      dataList : [
        {name: '今日累计供水',value: '--',unit : '亿m³' },
        {name: '当前闸前水位',value: '--',unit : 'm' },
        {name: '当前闸后水位',value: '--',unit : 'm' }
      ]
    }
  }

  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('waterNumData', (data) => {
        this.dataResData(data);
    });
  }

  componentWillUnmount(){
    this.listener.remove();
  }

  dataResData = (data) => {
     let arr = [
      {name: '今日累计供水',value: data.dayW,unit : '亿m³' },
      {name: '当前闸前水位',value: data.downZ,unit : 'm' },
      {name: '当前闸后水位',value: data.upZ,unit : 'm' }
    ]

    this.setState({
      dataList : arr
    });
  }


    render() {
      const {dataList} = this.state;
      return (
        <View style={styles.container}>
           
          <View style={styles.list}>
                {
                  dataList.map((item = {},index) => (
                       <View style={styles.listItem} key={`item_${index}`}>
                          <View style={styles.itemTop}>
                              <TextView style={{color : '#666666',fontSize : 10}}>{item.name}</TextView>
                          </View>

                          <View style={styles.itemBtm}>
                              <TextView style={{color : '#333333',fontSize : 28,marginRight : 3}}>{item.value}</TextView>
                              <TextView style={{color : '#999999',fontSize : 10,marginTop : 20}} >{item.unit}</TextView>
                          </View>
                       </View>
                      ))
                }

            </View>
        </View>
      );
    }
}
