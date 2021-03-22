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
    static propTypes = {
        jzList :PropTypes.array
    }

    static defaultProps = {
        jzList : []
    }

    constructor(props) {
        super(props);
        this.state = {
            dataArr : []
        };
    }

    componentWillReceiveProps(nextProps) {
        const {jzList} = nextProps;
        this.initChartOption(jzList);
    }

    initChartOption = (arr) => {
        let list = [];

        arr.forEach((item,index) => {
            list.push({
                value: item.total,
                name: item.name
            });
        });

        this.setState({
            dataArr : list
        })

    }


    componentDidMount() {

    }


    
    render() {
        const { dataArr } = this.state;
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
                color: ['#FFD64B','#409EFF'],
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
                data:dataArr
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
