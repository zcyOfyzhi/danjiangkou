import React, { Component } from 'react';
import {
    StyleSheet, 
    processColor, 
    View
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import Echarts from 'native-echarts';


const styles = StyleSheet.create({
    chart: {
        flex: 1
    },
    container: {
        height : 200,
    },
});

class Page extends Component {
    static propTypes = {
        dataList :PropTypes.array
      }
    
    static defaultProps = {
        dataList : []
    }

    constructor(props) {
        super(props);
        this.state = {
            chartOption : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const {dataList} = nextProps;
        this.initChartOption(dataList);
    }

    initChartOption = (arr) => {
        let tmArr = [];
        let dataOne = [];
        let dataTwo = [];
        
        arr.forEach((item,index) => {
            tmArr.push(`${item.year}年${item.month}月`);
            dataOne.push(item.monthlyResponseSup);
            dataTwo.push(item.monthlyTotalSup);
            
        });
      let option = {
        color: ['#409EFF', '#E6A23C'],
        legend: {
            data: ['月批复供水量','月实际供水量']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top : 30,
            left: 10,
            right: 0,
            bottom: 0,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: tmArr,
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            name: '亿m³',
            type: 'value',
            splitLine: {
                show: false,
            },
        }],
        series: [{
                name: '月批复供水量',
                type: 'bar',
                barGap: '0%',
                barWidth : '30%',
                data:dataOne
            },
            {
                name: '月实际供水量',
                type: 'bar',
                barGap: '0%',
                barWidth : '30%',
                data: dataTwo
            }
        ]
      };

      this.setState({
        chartOption : option
      })
    }

    
    render() {
        const { chartOption } = this.state;
        return (
          <View style={styles.container}>
              <Echarts option={chartOption}  height={180} />
        </View>
             
        );
    }
}

export default Page;
