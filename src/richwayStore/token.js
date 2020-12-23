import { observable, action } from 'mobx';

class Token {
    @observable token;

    @observable navigation;

    @observable appId;

    @observable user;

    constructor() {
      this.token = ''; // 初始化变量，可以定义默认值
      this.navigation = {};
      this.appId = '1dbbff8ce0fb45e997d86fc5f28f8b62';
      this.user = {};
    }

    @action // 方法推荐用箭头函数的形式
    setToken = (data) => {
      this.token = data;
    };

    @action
    setNavigation=(obj) => {
      this.navigation = obj;
    }

    @action
    setUser=(obj) => {
      this.user = obj;
    }
}

const token = new Token();

export default token;
