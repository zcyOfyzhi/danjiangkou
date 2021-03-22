import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Text,
  DeviceEventEmitter
} from 'react-native';
import { ButtonView, TextView,StatusView } from '@rich/react-native-richway-component';
import { Actionsheet} from 'beeshell';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '../../../css/BaseStyle';
import Chart from './Chart.js';
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    marginTop : 0,
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
  info : {
    padding : 15,
  },
  infoLetter : {
    fontSize : 12,
    color : '#333',
    lineHeight : 24,
  },
  main: {
    height : 320,
    display : 'flex',
  },
  mainTop : {
    flex : 1,
  },
  bottom : {
    height : 60,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingLeft : 20,
    paddingRight : 20,
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


  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#409EFF', '#FF5050', '#FFC30F', '#67C23A'],
      year : '',
      dataList : [],
      resData : []
    }
  }

  componentDidMount(){
    this.initYearOptions();
  }
  
  initYearOptions = () => {
    let nowYear = moment().format('YYYY');
    let startYear = '2014';
    let arr = [];
    for(let index = 0; index <= nowYear-startYear; index++){
      arr.push({
          label : Number(startYear) + index + '',
          value : Number(startYear) + index + ''
      });
    }
    this.setState({
      dataList : arr,
      year : nowYear
    });
  }

  getParams = () => {
    let params = {
      year : this.state.year || moment().format('YYYY'),
      page : 1,
      rows : 12
    }
    return params;
  }

  dealResData = (data) => {
     let dataList = [
      {tm : 11,value : ''},
      {tm : 12,value : ''},
      {tm : 1,value : ''},
      {tm : 2,value : ''},
      {tm : 3,value : ''},
      {tm : 4,value : ''},
      {tm : 5,value : ''},
      {tm : 6,value : ''},
      {tm : 7,value : ''},
      {tm : 8,value : ''},
      {tm : 9,value : ''},
      {tm : 10,value : ''},
    ];
    
    data.forEach(item => {
      dataList.forEach(sitem => {
          if(sitem.tm === item.month){
            sitem.value = item.monthAmount;
        }
      });
    });

    this.setState({
      resData : dataList
    });
    
    DeviceEventEmitter.emit('waterNumFourData',dataList);
    
  }
  btnOneClick = () => {
    this._actionStSheet.open()
  }


    render() {
      const {color,dataList,resData,year} = this.state;
      return (
        <View style={styles.container}>
          
          <View style={styles.top}>
              <TextView style={styles.BgTitle}>水量确认单</TextView>
              <View style={styles.topRight}>
                  <ButtonView
                      style={styles.btnList}
                      onPress={this.btnOneClick}
                  >
                    <TextView style={{color:'#89AADB',}}>{year}</TextView>
                    <Icon
                        name={'ios-arrow-down'}
                        size={18}
                        color={'#89AADB'}
                        style={{marginLeft: 6,}}
                      />
                </ButtonView>
              </View>
          </View>

          

          <View style={styles.main}>
            <View style={styles.mainTop}>
                <StatusView
                  ref={(v) => {
                    this.custom = v;
                  }}
                  getData={params => HttpUtils.get(Service.GetWaterSumList, params)}
                  params={this.getParams()}
                  callBack={this.dealResData}
                  errorFunc={() => this.setState({ enableButton: true })}
                >

              <Chart></Chart>
              </StatusView>
            </View>
            

          </View>

          <Actionsheet
                  ref={(c) => { this._actionStSheet = c; }}
                  header='年份'
                  maxShowNum = '4'
                  data={dataList}
                  cancelable={false}
                  onPressConfirm={(item) => {
                    this.setState({
                      year : item.value
                    })
                    this.custom.reload();
                  }} 
                  onPressCancel={() => {
                    console.log('cancel')
                  }}>
            </Actionsheet>

        </View>
      );
    }
}
