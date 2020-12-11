import React, {Component} from 'react';
import {
    View, StyleSheet, Image, ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import {TextView} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '../css/BaseStyle';

const itemStyle = StyleSheet.create({
    imageLoading: {
        flex: 1,
        alignItems: `center`,
        justifyContent: `center`
    },
    imageSuccess: {
        flex: 1,
        backgroundColor : '#ccc'
    },
    imageFail: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
        backgroundColor: `#ccc`,
        flexDirection: `row`
    },
    imageHidden: {
        position: `absolute`,
        top: `-1000%`
    }
});

class Page extends Component {
    static propTypes = {
        // navigation: PropTypes.object,
        src: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
    }

    static defaultProps = {
        // navigation: {},
        src: ``,
        width: 100,
        height: 100
    }

    constructor(props) {
        super(props);
        this.state = {
            // 1加载中 2加载成功 3加载失败
            loading: 1
        };
    }

    componentDidMount() {

    }

    render() {
        const {src, width, height} = this.props;
        const {loading} = this.state;
        return (
            <View
                style={{
                    width: width,
                    height: height,
                    overflow: `hidden`
                }}
                key={src}
            >
                {
                    loading === 1 ? <View style={itemStyle.imageLoading}>
                        <ActivityIndicator />
                    </View> : null
                }
                {
                    loading === 1 || loading === 2 ? <View style={[itemStyle.imageSuccess], loading === 1 ? itemStyle.imageHidden : {}}>
                        <Image
                            source={{uri: src}}
                            resizeMode ='contain'
                            style={{
                                width: width,
                                height: height,
                            }}
                            onLoad={() => {
                                this.setState({loading: 2})
                            }}
                            onError={() => {
                                console.log(src);
                                this.setState({loading: 3})
                            }}
                        />
                    </View> : null
                }
                {
                    loading === 3 ? <View style={itemStyle.imageFail}>
                        <Icon name="ios-help-circle" size={20} color={BaseStyle.valueItemColor}/>
                        <TextView style={{marginLeft: 8}}>加载失败</TextView>
                    </View> : null
                }
            </View>
        );
    }
}

export default Page;
