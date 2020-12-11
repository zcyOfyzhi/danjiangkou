import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import Echarts from 'native-echarts';

const styles = StyleSheet.create({
    chart: {
        height: 100,
        width: '100%'
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
        this.state = {};
    }

    componentDidMount() {

    }


    
    render() {
        const option = {
            tooltip: {
                trigger: 'item',
                confine: false,
                position : [10,10],
                formatter: '{b}：<br/>{c}个'
            },
            series: [{
                name: '界桩比例图',
                type: 'pie',
                color: ['#409EFF', '#F5A623'],
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
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
                data: [{
                    name : "正常",
                    value : 17000
                },
                {
                    name : "损坏",
                    value : 1000
                }]
            }]
          };
        return (
          <View style={styles.container}>
          <Echarts option={option}  height={100} />
        </View>
             
        );
    }
}

export default Page;
