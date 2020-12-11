import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView, ButtonView } from '@rich/react-native-richway-component';
import BaseStyle from '../css/BaseStyle';
import HttpUtils from './HttpUtils';
import Service from '../base/Service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: 'blue',
  },
  footer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 15,
    color: 'black',
  },
  text: {
    color: BaseStyle.textItemColor,
    fontSize: 14,
  },
});
export default class RefreshFlatList extends Component {
    static propTypes = {
      loadingStatus: PropTypes.func,
      page: PropTypes.string,
      dataChange: PropTypes.func,
      params: PropTypes.object,
      // 回传response
      getResponse: PropTypes.func,
      getData: PropTypes.func,
    }

    static defaultProps = {
      getResponse: () => {
      },
      loadingStatus: () => {
      },
      page: '',
      dataChange: () => {
      },
      getData: () => new Promise((resolve) => {
        resolve();
      }),
      params: {},
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        // 网络请求状态
        error: false,
        dataArray: [],
        showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        isRefreshing: false, // 下拉控制
        params: props.params,
        totalPage: 0, // 总页数
        keepStatus: false,

      };
    }


    componentDidMount() {
      const { params } = this.state;
      // 请求数据
      this.fetchData(params);
    }

    getCheckData = (params) => {
      const { dataArray } = this.state;
      HttpUtils.get(Service.automaticCheck, params).then((res) => {
        let resDataArr = res.data;
        if (res.data === null || res.data === undefined || res.data === '') {
          resDataArr = [];
        }
        const newDataArray = dataArray.concat(resDataArr);
        this.setState({
          dataArray: newDataArray,
        });
      });
    }

    fetchData = (params) => {
      const {
        getData, loadingStatus, getResponse, page, dataChange,
      } = this.props;
      const { dataArray, keepStatus } = this.state;
      if (loadingStatus) {
        loadingStatus(true);
      }
      getData(params).then((response) => {
        // 回传response信息给界面
        if (getResponse) {
          getResponse(response);
        }
        let foot = 0;

        let resDataArr = response.data;
        if (response.data === null || response.data === undefined || response.data === '') {
          resDataArr = [];
        }
        let newDataArray;
        if (keepStatus) {
          newDataArray = [].concat(resDataArr);
        } else {
          newDataArray = dataArray.concat(resDataArr);
        }

        if (params[page || 'page'] >= response.pages) {
          foot = 1;// listView底部显示没有更多数据了
        }
        if (dataChange) {
          dataChange(newDataArray);
        }
        this.setState({
          dataArray: newDataArray,
          isLoading: false,
          showFoot: foot,
          isRefreshing: false,
          error: false,
          totalPage: response.pages,
          keepStatus: false,
        }, () => {
          const { state, props } = this;
          if (state.params.grp
              && state.params[props.page || 'page']
              && state.params.grp === 'alm'
              && state.params[props.page || 'page'] === 1) {
            const checkParams = {
              status: 'unclose',
              stm: state.params.startTm,
              end: state.params.endTm,
              stnm: state.params.nm,
              stcd: '',
            };
            this.getCheckData(checkParams);
          }
        });
      }).catch(() => {
        this.setState({
          error: true,
        });
      }).finally(() => {
        if (loadingStatus) {
          loadingStatus(false);
        }
      });
    }


    renderFooter = () => {
      const { showFoot } = this.state;
      if (showFoot === 1) {
        return (
          <View style={styles.footer}>
            <TextView style={styles.text}>
                        没有更多数据了
            </TextView>
          </View>
        );
      }
      if (showFoot === 2) {
        return (
          <View style={styles.footer}>
            <ActivityIndicator color={BaseStyle.textItemColor} />
            <TextView style={styles.text}>正在加载更多数据...</TextView>
          </View>
        );
      }
      if (showFoot === 0) {
        return <View style={styles.footer} />;
      }

      return <View />;
    }

    onEndReached = () => {
      const {
        params, totalPage, showFoot, page,
      } = this.state;
        // 如果是正在加载中或没有更多数据了，则返回
      if (showFoot !== 0 || totalPage === 0) {
        return;
      }
      // 如果当前页大于或等于总页数，那就是到最后一页了，返回
      if ((params[page || 'page'] !== 1) && (params[page || 'page'] >= totalPage)) {
        return;
      }
      params[page || 'page'] += 1;


      // 底部显示正在加载更多数据
      this.setState({
        showFoot: 2,
        params,
      }, () => {
        const { state } = this;
        this.fetchData(state.params);
      });
    }

    // 调用此方法刷新 newParams不传刷新第一页
    onRefresh = (newParams) => {
      const { page, params } = this.props;
      let str;
      if (newParams) {
        const obj = newParams;
        obj[page || 'page'] = 1;
        str = obj;
      } else {
        params[page || 'page'] = 1;
        str = params;
      }
      this.setState({
        dataArray: [],
        isRefreshing: true,
        showFoot: 0,
        error: false,
        params: str,
        totalPage: 0,
        keepStatus: false,
      }, () => {
        const { state } = this;
        this.fetchData(state.params);
      });
    }

    reload = () => {
      this.setState({
        isRefreshing: true,
        showFoot: 0,
        error: false,
        totalPage: 0,
      }, () => {
        const { params } = this.state;
        this.fetchData(params);
      });
    }

    renderData = () => {
      const { dataArray, showFoot, isRefreshing } = this.state;
      return (
        <FlatList
          {...this.props}
          data={dataArray}
          extraData={showFoot}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
              titleColor={BaseStyle.textItemColor}
              colors={[BaseStyle.textItemColor, '#FF7E71', '#FFCC00', '#0094FF']}
              tintColor={BaseStyle.textItemColor}
            />)}
        />

      );
    }

    // 加载失败view
    renderErrorView = () => (
      <View style={styles.container}>
        <ButtonView onPress={() => {
          this.reload();
        }}
        >
          <TextView style={styles.text}>
                    请求出错，点击重新获取
          </TextView>
        </ButtonView>
      </View>
    )

    // 加载等待页
    renderLoadingView = () => (
      <View style={styles.container}>
        <ActivityIndicator
          animating
          color={BaseStyle.textItemColor}
        />
      </View>
    )

    render() {
      const { isLoading, error } = this.state;
      // 第一次加载等待的view
      if (isLoading && !error) {
        return this.renderLoadingView();
      }
      if (error) {
        // 请求失败view
        return this.renderErrorView();
      }
      // 加载数据
      return this.renderData();
    }
}
