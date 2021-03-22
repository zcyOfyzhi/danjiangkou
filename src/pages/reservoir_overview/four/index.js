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
import Chart from './Chart.js';
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    marginTop : 0,
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
      color : ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16','#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D','#269A99','#FF99C3','#5B8FF9','#BDD2FD'],
      dataList : [],
      dataListTwo : [
        {name: '配对',value: 19,unit : '对' },
        {name: '产生苗种',value: 30,unit : '批' },
        {name: '放流',value: 30,unit : '次' },
        {name: '已编号',value: 7,unit : '条' },
        {name: '鳞片收集',value: 254,unit : '份' },
        {name: '鳍条收集',value: 272,unit : '份' },
      ]
    }
  }
   
  dealResData = (data) => {
    this.setState({
      dataList : data
    });
  }

    render() {
      const {color,dataList,dataListTwo} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>鱼类增殖</TextView>
           
          <View style={styles.list}>
                {
                  dataListTwo.map((item = {},index) => (
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

            
          
            <StatusView
                ref={(v) => {
                  this.custom = v;
                }}
                getData={params => HttpUtils.get(Service.GetFishReleaseGettotal, params)}
                callBack={this.dealResData}
                errorFunc={() => this.setState({ enableButton: true })}
            >

          <View style={styles.main}>
            <View style={styles.top}>
              <Chart dataList={dataList}></Chart>
            </View>

            <View style={styles.bottom}>
            {
                    dataList.map((item = {},index) => (
                       <View style={styles.item} key={`item_${index}`}>
                          <View style={styles.itemLeft}>
                              <TextView style={[styles.circle, { backgroundColor: `${color[index]}` }]}></TextView>
                              <TextView>{item.fishName}</TextView>
                          </View>

                          <TextView style={styles.itemRight}>{item.fishTotal}</TextView>

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
