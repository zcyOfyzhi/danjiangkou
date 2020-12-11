import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
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
    constructor(props) {
        super(props);
        this.state = {
            chartOption : {}
        };
    }

    componentDidMount() {
        this.initChartOption();
    }

    initChartOption = () => {
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
                left: 10,
                right: 10,
                bottom: 60,
                containLabel: true
            },
            legend: {
              data: ['水量', '流量', '调令流量']
            },
            xAxis: [{
              type: 'category',
              data: ['12月1日','12月2日','12月3日','12月4日','12月5日'],
              axisPointer: {
                type: 'shadow'
              },
              splitLine: {
                show : false
              },
              axisLine: {
                  lineStyle: {
                      normal : {
                        type: 'solid',
                        color: `rgba(255, 255, 255, .5)`,
                        width:'1'
                      }
                      
                  }
              },
              
            }],
            yAxis: [{
                type: 'value',
                name: '水量m³',
                splitLine: {
                   show : true,
                   lineStyle: {
                      color: `rgba(255, 255, 255, .15)`
                  }
                },
                axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color: `rgba(255, 255, 255, .5)`,
                      width:'1'
                  }
              },
                
    
              },
              {
                type: 'value',
                name: '流量m³/s',
                splitLine: {
                   show : true,
                   lineStyle: {
                      color: `rgba(255, 255, 255, .15)`
                  }
                },
                axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color: `rgba(255, 255, 255, .5)`,
                      width:'1'
                  }
              },
              }
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
                data: [10,11,10,12,9]
              },
              {
                name: '流量',
                type: 'line',
                itemStyle: {
                    normal : {
                     color: '#50E3C2'
                    }
                },
                data: [8,9,6,7,8]
              },
              {
                name: '调令流量',
                type: 'line',
                itemStyle: {
                    normal : {
                     color: '#E6A23C'
                    }
                },
                lineStyle: {
                  type: 'dashed'
                },
                yAxisIndex: 1,
                data: [7,8,5,6,7]
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
