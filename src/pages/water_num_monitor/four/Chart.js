import React, { Component } from 'react';
import {
    StyleSheet, 
    processColor, 
    View,
    DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
import BaseStyle from '../../../css/BaseStyle';
import Echarts from 'native-echarts';

const styles = StyleSheet.create({
    chart: {
        height: '100%',
        width : '100%',
    },
    container: {
        paddingVertical: 10,
        justifyContent: `space-between`,
        alignItems: `center`
    },
    legend: {
        flexDirection: `row`
    },
    legendItem: {
        flexDirection: `row`,
        alignItems: `center`,
        marginRight: 5
    },
    icon: {
        width: 18,
        height: 12,
        borderRadius: 5,
        marginRight: 3
    },
    text: {
        fontSize: 10
    }
});

class Page extends Component {

    static propTypes = {
        resData :PropTypes.array
      }
    
    static defaultProps = {
        resData : []
    }

    constructor(props) {
        super(props);
        this.state = {
            chartOption : {}
        };
    }

    componentDidMount(){
        this.chartFourlistener = DeviceEventEmitter.addListener('waterNumFourData', (data) => {
            this.initChartOption(data);
        });
      }
    
      componentWillUnmount(){
        this.chartFourlistener.remove();
      }

    initChartOption = (arr) => {
        let yArr = [];
        arr.forEach(item => {
          yArr.push(item.value);
        });
         
        let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            grid: {
                top : 30,
                left:30,
                right: 10,
                bottom: 60,
                containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['11月','12月','01月','02月','03月','04月','05月','06月','07月','08月','09月','10月'],
              axisPointer: {
                type: 'shadow'
              },
              splitLine: {
                show : true
              },
              axisLine: {
                  lineStyle: {
                      type: 'solid',
                      width:'1'
                  }
              },
              
            }],
            yAxis: [
              {
                type: 'value',
                splitLine: {
                   show : false,
                   lineStyle: {
                      color: `#000`,
                  }
                },
                axisLine: {
                  lineStyle: {
                      type: 'solid',
                      width:'1'
                  }
              },
                
    
              },
            ],
            series: [{
                name: '水量',
                type: 'bar',
                barWidth : '30%',
                itemStyle: {
                    normal : {
                     color: '#409EFF'
                    }
                 },
                data:yArr
              }
            ]
          };
          this.setState({
            chartOption : option
        });
    }

    render() {
        const { chartOption } = this.state;
        return (
          <View style={styles.container}>
          <Echarts option={chartOption}  height={350} />
        </View>
             
        );
    }
}

export default Page;
