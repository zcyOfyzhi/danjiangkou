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
        let _this = this;
        let option  = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 20,
                left: '0',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2020.1', '2020.2', '2020.3', '2020.4', '2020.5', '2020.6', '2020.7'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, .2)'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel:{
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '地灾次数',
                    type: 'bar',
                    barWidth: '60%',
                    data: [1, 2, 1, 3, 2, 2, 3],
                    itemStyle: {
                        normal: {
                            label: {
                                formatter: "{c}次",
                                show: true,
                                position: "top",
                            },
                            color: '#ee6f6b',
                        }
                    }
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
               <Echarts option={chartOption}  height={300} />   
          </View>
             
        );
    }
}

export default Page;
