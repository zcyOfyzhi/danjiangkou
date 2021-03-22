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
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOption : {}
        };
    }
    
    componentDidMount(){
        this.chartTwolistener = DeviceEventEmitter.addListener('waterNumData', (data) => {
            this.initChartOption(data.yearRealSup,data.yearPlanSup);
        });
    }
    
    componentWillUnmount(){
    this.chartTwolistener.remove();
    }

    initChartOption(num1,num2) {
        let option = {
           grid: {
              top : 0,
              left: 10,
              right: 40,
              bottom: 0,
              containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              inside: true,
              margin: 30,
              textStyle: {
                color: '#fff'
              }
            },
            z: 10,
            data: ['计划','实际']
          },
          yAxis: {
            type: 'value',
            show : false,
            axisLabel: {
              show : false,
            },
            splitLine: {
              show : false
            },
  
          },
          series: [{
            data: [
                {
                    name: '计划',
                    value: num2,
                    itemStyle: {
                        normal : {
                            color: '#409EFF'
                        }
                    },
                    label: {
                        normal : {
                            show: true,
                            distance: 10,
                            color: '#fff',
                            position: 'insideBottom'
                        }
                    }
                  },
                {
                name: '实际',
                value: num1,
                itemStyle: {
                    normal : {
                        color: '#FFC30F'
                    }
                },
                label: {
                  normal : {
                    show: true,
                    distance: 10,
                    color: '#fff',
                    position: 'insideBottom'
                  }
  
                }
              },
              
            ],
            barGap: 0,
            barCategoryGap: 0,
            type: 'bar'
        }]
    }

    this.setState({
        chartOption : option
    });
  
      }

    render() {
        const { chartOption } = this.state;
        return (
          <View style={styles.container}>
             <Echarts option={chartOption}  height={186} />
        </View>
             
        );
    }
}
