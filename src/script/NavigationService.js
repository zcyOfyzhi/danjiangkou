// 路由对象保存到全局， 并提供两个方法在无法拿到rm的情况下 进行路由跳转
import { NavigationActions } from "react-navigation";

let _navigator;

const setNav = (ref) => {
  _navigator = ref;
};

const getNav = () => _navigator;

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
};

const back = () => {
  _navigator.dispatch(NavigationActions.back());
};

export default {
  back,
  setNav,
  getNav,
  navigate,
};
