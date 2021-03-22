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
import IconOne from '../../../image/1.png';
import IconTwo from '../../../image/2.png';
import EarthquakeInfo from './earthquakeInfo.js';
import DisaterInfo from './disaterInfo.js';
import BoundaryInfo from './boundaryInfo.js';
import FishInfo from './fishInfo.js';
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';

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
  },
  titleInfo : {
    display : 'flex',
    flexDirection : 'row',
    borderBottomWidth : 1,
    borderColor : '#EEE',
    marginLeft : 10,
    marginRight : 10,
    paddingBottom : 30,
  },
  titleInfoItem : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingLeft : 20,
    paddingRight : 20,
    


  },
  titleInfoSItem : {
    width : '100%',
    display : 'flex',
    flexDirection : 'column'
  },
  color1 : {
    color : '#333333',
    fontSize : 12
  },
  color2 : {
    color : '#333333',
    fontSize : 28,
    fontWeight : 'bold',
    marginTop : 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop : 15,
  },

});

export default class ReserColumn extends Component {


  constructor(props) {
    super(props);
    this.state = {
      numOne : '',
      numTwo : '',
      dzList : [],
      dsList : [],
      jzList : []
      
    }
  }
  
  dealResData = (data) => {
    this.setState({
      numOne : data.xjList[0].total,
      numTwo : data.xjList[1].total,
      dzList : data.dzList,
      dsList : data.dsList,
      jzList : data.jzList
    })
  }

    render() {
      const { numOne,numTwo,dzList,dsList,jzList } = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>库区管理</TextView>

          <StatusView
              ref={(v) => {
                this.custom = v;
              }}
              getData={params => HttpUtils.get(Service.GetMonitorRese, params)}
              callBack={this.dealResData}
              errorFunc={() => this.setState({ enableButton: true })}
            >
             
          <View style={styles.titleInfo}>
            
            <View style={[styles.titleInfoItem, { marginRight: 20 }]}>
                <View >
                  <TextView style={styles.color1}>巡查总次数</TextView>
                  <Image source={IconOne} style={styles.icon} />
                </View>

                <View>
                  <TextView style={styles.color2}>{numOne}</TextView>
                </View>
            </View>

            <View style={styles.titleInfoItem}>
              <View >
                <TextView style={styles.color1}>问题数量</TextView>
                <Image source={IconTwo} style={styles.icon} />
              </View>

              <View>
                <TextView style={styles.color2}>{numOne}</TextView>
              </View>
          </View>

          </View>

          <View>
             <EarthquakeInfo dzList={dzList}></EarthquakeInfo>
          </View>

          <View>
             <DisaterInfo dsList={dsList}></DisaterInfo>
          </View>

           <View>
            <BoundaryInfo jzList={jzList}></BoundaryInfo>
          </View> 

           <View>
            <FishInfo></FishInfo>
          </View>

          

        </StatusView>
        </View>
      );
    }
}
