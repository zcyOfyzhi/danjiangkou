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
import Chart from './Chart.js';
import HttpUtils from '../../../common/HttpUtils';
import Service from '../../../base/Service';


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
    height : 320,
    display : 'flex',
  },
  top : {
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
  subTitle : {
    width : '100%',
    marginBottom :10,
    paddingLeft : 20,
  }

  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#409EFF', '#FF5050', '#FFC30F', '#67C23A'],
      dataList : [],
      total : ''
    }
  }

  dealResData = (data) => {
    this.setState({
      total : data.instable,
      dataList : data.list
    });
  }



    render() {
      const {color,total,dataList} = this.state;
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>地灾</TextView>
          <View style={styles.subTitle}>
              <TextView style={{fontSize : 12,color : '#333'}}>2020年不稳定地灾总次数：{total}次</TextView>
          </View>
          
          <StatusView
            ref={(v) => {
              this.custom = v;
            }}
            getData={params => HttpUtils.get(Service.GetReseDisasterData, params)}
            callBack={this.dealResData}
            errorFunc={() => this.setState({ enableButton: true })}
          >
            <View style={styles.main}>
              <View style={styles.top}>
                <Chart dataList={dataList}></Chart>
              </View>
            </View>
          </StatusView>

        </View>
      );
    }
}
