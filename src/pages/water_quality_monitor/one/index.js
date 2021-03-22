import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import { ButtonView, TextView,StatusView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import Chart from './Chart.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomModal, Actionsheet,Datepicker} from 'beeshell';
import moment from 'moment';
const { width,height } = Dimensions.get('window');
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    paddingBottom : 20,
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
  chart : {
    height : 320,
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
        {value: '',name: 'I类水' },
        {value: '',name: 'II类水'},
        {value: '',name: 'III类水'},
        {value: '',name: 'IV类水'},
        {value: '',name: 'V类水' },
        {value: '',name: '劣V类水'}
      ],
      stm : moment().format(`YYYY-MM-01 00:00:00`),
      etm : moment().endOf('month').format(`YYYY-MM-DD 23:59:59`),
      showStm : moment().format(`YYYY-MM-DD`),
      ckStationType : '0,3,4',
      stationTypeName : '自动化监测',
      tmName : moment().format(`YYYY-MM`)
    }
  }

  getParams = () => {
    let {stm,etm,ckStationType} = this.state;
    let params = {
      stm: stm,
      etm: etm,
      ckStationType: ckStationType
    }
    return params;
  }

  dealResData = (data) => {
    let chartData = data.statisticsMap;
    let {dataList } = this.state;
    dataList.forEach((item,index) => {
      item.value = chartData[index+1];
    });

    this.setState({
      dataList : dataList
    });

    DeviceEventEmitter.emit('waterQualityData',dataList);
    DeviceEventEmitter.emit('waterQualityTableData',data.wqWqsinfBS);
  }

  btnOneClick = () => {
    this._actionStSheet.open()
  }

  btnTwoClick = () => {
    this.bottomModal1.open();
  }

  onConfirm = () => {
      this.custom.reload();
  }


    render() {
      const {color,dataList,start,stationTypeName,tmName,showStm} = this.state;
      return (
        <View style={styles.container}>
        <View style={styles.top}>
              <TextView style={styles.BgTitle}>水质比例图</TextView>
              <View style={styles.topRight}>
                  <ButtonView
                      style={styles.btnList}
                      onPress={this.btnOneClick}
                  >
                  <TextView style={{color:'#89AADB',}}>{stationTypeName}</TextView>
                    <Icon
                        name={'ios-arrow-down'}
                        size={18}
                        color={'#89AADB'}
                        style={{marginLeft: 6,}}
                      />
                </ButtonView>

                <ButtonView
                  style={styles.btnList}
                  onPress={this.btnTwoClick}
                  >
                    <TextView style={{color:'#89AADB',}}>{tmName}</TextView>
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
              getData={params => HttpUtils.get(Service.GetWaterQualityList, params)}
              params={this.getParams()}
              callBack={this.dealResData}
              errorFunc={() => this.setState({ enableButton: true })}
            >
          <View style={styles.main}>
            <View style={styles.chart}>
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
                    date={this.state.showStm}
                    onChange={(date) => {
                      this.setState({
                        stm : moment(date).format(`YYYY-MM-01 00:00:00`),
                        etm : moment(date).endOf('month').format(`YYYY-MM-DD 23:59:59`),
                        tmName : moment(date).format(`YYYY-MM`),
                        showStm : date
                      })
                    }}
                  />
                </View>
            </BottomModal>

            <Actionsheet
                  ref={(c) => { this._actionStSheet = c; }}
                  header='监测类型'
                  maxShowNum = '4'
                  data={[
                    {
                      label: '自动化监测',
                      value: '0,3,4'
                    },
                    {
                      label: '人工监测',
                      value: '1,2',
                    }
                  ]}
                  cancelable={false}
                  onPressConfirm={(item) => {
                     this.setState({
                       ckStationType : item.value,
                       stationTypeName : item.label
                     });
                     this.custom.reload()
                  }} 
                  onPressCancel={() => {
                    console.log('cancel')
                  }}>
            </Actionsheet>

        </View>
      );
    }
}
