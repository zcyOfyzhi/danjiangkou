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
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonView, TextView,StatusView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import Circle from '../../../common/Circle.js';
import moment from 'moment';
import { Actionsheet,BottomModal,Datepicker } from 'beeshell';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ChartOne from './Chart1.js';
import ChartTwo from './Chart2.js';
const { width,height } = Dimensions.get('window');
import HttpUtils from  '../../../common/HttpUtils';
import Service from '../../../base/Service';



const styles = StyleSheet.create({
  container: {
    
  },
  top : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  BgTitle : {
    fontSize : 20,
    color : '#141F2E',
    margin : 20,
    marginBottom : 10,
  },
  topRight : {
    display : 'flex',
    flexDirection : 'row',
    marginTop : 20,
  },
  btnList : {
    display : 'flex',
    flexDirection : 'row',
    marginRight : 20,
  },
  main: {
    width : '100%',
    height : 200,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    paddingLeft : 20,
    paddingRight : 20,
    paddingBottom : 30,
  },
  left : {
    flex : 1,
    height : 200,
  },
  right : {
    flex : 1,
    height : 200
  },
  info : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
  },
  subTitle : {
    padding : 15,
    fontSize : 14,
    lineHeight : 22,
  }
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      numOne : '--',
      numTwo : '--',
      resData : {},
      date: moment().subtract(0, 'days').format('YYYY-MM'),
      start: moment().subtract(0, 'days').format('YYYY-MM-DD'),
      showDate : moment().format('YYYY-MM')
    }
  }
   



  btnTwoClick = () => {
    this.bottomModal1.open();
  }
   
  getParams = () => {
    let { date } = this.state;
    let params = {
      sectionCode : 'c2804ef8c90c81c57a932f82fe3a151b',
      tm : moment(date).format('YYYY-MM')
    }
    return params;
  }

  dealResData = (data) => {
     this.setState({
      resData : data
     });
     this.getTopInfoData(data.monthRealSup,data.monthPlanSup);
     DeviceEventEmitter.emit('waterNumData',data);
  }

  getTopInfoData = (num1,num2) => {
    if(num1){
      num1 = num1.toFixed(2);
    }
   if(num2){
      num2 = num2.toFixed(2);
    }

    this.setState({
      numOne : num1,
      numTwo : num2
    })
  }
  onConfirm = () => {
    let { date } = this.state;
      this.custom.reload({
        sectionCode : 'c2804ef8c90c81c57a932f82fe3a151b',
        tm : moment(date).format('YYYY-MM')
      });
  }
  
  

    render() {
      const { isDateTimePickerVisible,date,start,numOne,numTwo,resData,showDate } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.top}>
              <TextView style={styles.BgTitle}>供水详情</TextView>
              <View style={styles.topRight}>
                  <ButtonView
                      style={styles.btnList}
                      onPress={() => {}}
                  >
                    <TextView style={{color:'#89AADB',}}>陶岔0+300</TextView>
                </ButtonView>

                <ButtonView
                  style={styles.btnList}
                  onPress={this.btnTwoClick}
                  >
                    <TextView style={{color:'#89AADB',}}>{showDate}</TextView>
                    <Icon
                        name={'ios-arrow-down'}
                        size={18}
                        color={'#89AADB'}
                        style={{marginLeft: 6,}}
                      />
                </ButtonView>
              </View>
          </View>
          
          <StatusView
              ref={(v) => {
                this.custom = v;
              }}
              getData={params => HttpUtils.get(Service.GetWaterSupplyMointorInfo, params)}
              params={this.getParams()}
              callBack={this.dealResData}
              errorFunc={() => this.setState({ enableButton: true })}
            >
          <TextView style={styles.subTitle}>当月实际供水量：{numOne}亿m³，月计划供水量：{numTwo}亿m³</TextView>
          

          <View style={styles.main}>
            <View style={styles.left}>
                <ChartOne></ChartOne>
                <View style={styles.info}>
                    <TextView>月供水（亿m³）</TextView>
                 </View>
            </View>

            <View style={styles.right}>
                <ChartTwo></ChartTwo>
                <View style={styles.info}>
                    <TextView>年供水（亿m³）</TextView>
                 </View>
            </View>
          </View>

          
              </StatusView>

              <BottomModal
                    ref={(c) => { this.bottomModal1 = c }}
                    title='请选择日期'
                    cancelable={true}
                    rightCallback={() => {
                      this.onConfirm();
                    }}
                    onClosed={() => {}}
              >
                <View style={{ paddingVertical: 15 }}>
                  <Datepicker
                    style={{ paddingHorizontal: 50 }}
                    proportion={[1, 1, 1]}
                    startYear={2010}
                    numberOfYears={20}
                    date={this.state.date}
                    onChange={(date) => {
                      this.setState({
                        date: date,
                        showDate : moment(date).format('YYYY-MM')
                      })
                    }}
                  />
                </View>
            </BottomModal>
        </View>
      );
    }
}
