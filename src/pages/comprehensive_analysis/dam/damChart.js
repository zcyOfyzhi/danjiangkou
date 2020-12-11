import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
} from 'react-native';
import PropTypes from 'prop-types';
import Echarts from 'native-echarts';
import { TextView } from '@rich/react-native-richway-component';

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
            {value: 163,name: '温度计' },
            {value: 32,name: '三维变形记'},
            {value: 16,name: '锚杆应力计'},
            {value: 42,name: '裂缝计'},
            {value: 6,name: '伸缩计'},
            {value: 100,name: '渗压计'},
            {value: 84,name: '应变计'},
            {value: 100,name: '钢筋计'},
            {value: 28,name: '测压管'}
        ];

        let legendArr = [];
        dataList.forEach(item => {
            legendArr.push(item.name);
        });

        let title = '总设备';
        let num = 320;

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                type:'scroll',
                orient: 'vertical',
                icon: 'circle',
                right: 20,
                top: 0,
                itemGap: 6,
                pageIconColor : '#fff',
                pageIconSize : 12,
                pageTextStyle : {
                   color : '#fff'
                },
                data: legendArr,
            },
            title: [{
                text : `${title} : ${num}`,
                textAlign: 'center',
                top: '33%',
                left: '33%',
                textStyle : {
                    fontWeight: 'normal',
                }
            }],
            series: [{
                name: '设备比例图',
                type: 'pie',
                color: ['#007DFF', '#9446E7', '#EF3737', '#FFAF2A', '#AE1616', '#DCD535', '#4BD754', '#1FC4D4', '#3539DF'],
                radius: ['40%', '60%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                },
                labelLine: {
                    normal: {
                      show: false
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
                <Echarts option={chartOption}  height={260} />
            </View>
             
        );
    }
}

export default Page;
