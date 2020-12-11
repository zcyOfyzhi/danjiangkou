import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
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

    componentDidMount() {
        this.initChartOption();
    }
    
    initChartOption = () => {
        let _this = this;
        let dataList = [
            {value: 69,name: '无问题' },
            {value: 12,name: '有问题'},
            {value: 10,name: '待处理'},
            {value: 9,name: '已处理'}
        ];

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                name: '巡查上报状态统计',
                type: 'pie',
                color: ['#409EFF', '#FF5050', '#FFC30F', '#67C23A'],
                radius: '55%',
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
                data: dataList
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
