import React, { Component } from 'react';
import {
    StyleSheet, 
    processColor, 
    View,
    DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
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
    
    componentDidMount(){
        this.chartQualityListener = DeviceEventEmitter.addListener('waterQualityData', (data) => {
            this.initChartOption(data);
        });
      }
    
      componentWillUnmount(){
        this.chartQualityListener.remove();
      }



    initChartOption = (arr) => {
        // let dataList = [
        //     {value: 7,name: 'I类水' },
        //     {value: 6,name: 'II类水'},
        //     {value: 5,name: 'III类水'},
        //     {value: 4,name: 'IV类水'},
        //     {value: 2,name: 'V类水' },
        //     {value: 1,name: '劣V类水'}
        // ];

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                name: '水质比例图',
                type: 'pie',
                color:  ['#00B0FF', '#00FF0C', '#FFF200', '#FFA614','#FF3900', '#8A050C'],
                radius: ['40%', '60%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                      formatter: '{b}:{c}',
                      show: true
                    },
                },
                labelLine: {
                    normal: {
                      length : 2,
                      length : 3,
                      show: true
                    }
                },
                data: arr
            }]
        };

        this.setState({
            chartOption : option
        });
    }

   
    render() {
        const { chartOption } = this.state;
        return (
          <View style={styles.container}>
             <Echarts option={chartOption}  height={320} />   
        </View>
             
        );
    }
}

export default Page;
