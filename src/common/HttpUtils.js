import Fetch from '@rich/react-native-richway-httputils';
import { LayerModal, Dialog } from '@rich/react-native-richway-component';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Service from '../base/Service';
import store from '../richwayStore';

const HttpUtils = {};

let hadShow = false;

function reset() {
  if (hadShow) {
    return;
  }
  hadShow = true;
  Dialog.open({
    text: '会话超时，请重新登录！',
    alert: true,
    modal: true,
    ok: () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
        key: null,
      });
      store.token.setToken('');
      hadShow = false;
      AsyncStorage.removeItem('token');
      // 在组件中使用dispatch调度路由
      store.token.navigation.dispatch(resetAction);
    },
  });
}

HttpUtils.get = (Url, params, showModal, Headers) => {
  if (showModal) {
    LayerModal.open();
  }
  let headers = Headers;
  let uri = Service.SERVER_Url + Url;
  if (Url.length > 4) {
    const httpStr = Url.substr(0, 4);
    if (httpStr.toLowerCase() === 'http') {
      uri = Url;
    }
  }
  if (headers) {
    headers.accessToken = store.token.token;
    headers.appId = store.token.appId;
  } else {
    headers = {
      accessToken: store.token.token,
      appId: store.token.appId,
    };
  }
  return new Promise((resolve, reject) => {
    Fetch.get(uri, params, headers).then((res) => {
      resolve(res);
    }).catch((error) => {
      if (error.message === '登录过期') {
        reset();
      } else {
        reject(new Error(error.message));
      }
    }).finally(() => {
      if (showModal) {
        LayerModal.close();
      }
    });
  });
};

HttpUtils.post = (Url, params, showModal, Headers) => {
  if (showModal) {
    LayerModal.open();
  }
  let headers = Headers;
  let uri = Service.SERVER_Url + Url;
  if (Url.length > 4) {
    const httpStr = Url.substr(0, 4);
    if (httpStr.toLowerCase() === 'http') {
      uri = Url;
    }
  }
  if (headers) {
    headers.accessToken = store.token.token;
    headers.appId = store.token.appId;
  } else {
    headers = {
      accessToken: store.token.token,
      appId: store.token.appId,
    };
  }
  return new Promise((resolve, reject) => {
    Fetch.post(uri, params, headers).then((res) => {
      resolve(res);
    }).catch((error) => {
      if (error.message === '登录过期') {
        reset();
      } else {
        reject(new Error(error.message));
      }
    }).finally(() => {
      if (showModal) {
        LayerModal.close();
      }
    });
  });
};

HttpUtils.delete = (Url, params, showModal, Headers) => {
  if (showModal) {
    LayerModal.open();
  }
  let headers = Headers;
  let uri = Service.SERVER_Url + Url;
  if (Url.length > 4) {
    const httpStr = Url.substr(0, 4);
    if (httpStr.toLowerCase() === 'http') {
      uri = Url;
    }
  }
  if (headers) {
    headers.accessToken = store.token.token;
    headers.appId = store.token.appId;
  } else {
    headers = {
      accessToken: store.token.token,
      appId: store.token.appId,
    };
  }
  return new Promise((resolve, reject) => {
    Fetch.Delete(uri, params, headers).then((res) => {
      resolve(res);
    }).catch((error) => {
      if (error.message === '登录过期') {
        reset();
      } else {
        reject(new Error(error.message));
      }
    }).finally(() => {
      if (showModal) {
        LayerModal.close();
      }
    });
  });
};
export default HttpUtils;
