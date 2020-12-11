import React, { Component } from 'react';
import {
    StyleSheet, 
    processColor, 
    View
} from 'react-native';
import PropTypes from 'prop-types';
import { BarChart } from 'react-native-charts-wrapper';
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
    color = [`#3385FF`,`#F5A623`];
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
        color: ['#409EFF', '#E6A23C'],
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
            data: ['2020年6月','2020年7月','2020年8月','2020年9月'],
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
                data: [10,11,12,10]
            },
            {
                name: '月实际供水量',
                type: 'bar',
                barGap: '0%',
                barWidth : '30%',
                data: [8,10,12,9]
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
