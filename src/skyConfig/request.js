import Vue from 'vue';
import Axios from 'axios';
import router from '@/router/index'
import Base64 from '@/skyConfig/libs/Base64';
import utils from '@/skyConfig/libs/utils';

const appConfig = {
  sign: 'abc',
  appId: 1000
};

Axios.defaults.baseURL = process.env.NODE_ENV;


Axios.interceptors.request.use(function (config) {
  let baseURL = Axios.defaults.baseURL;
  formartParams(config, baseURL, appConfig)
  return config;
})


//拦截器错主回调
function extCatch(err, func) {
  let res = err.response
  if (res) {
    if (res.status == 403) {
      let errCode = res.data.code;
      if (errCode == '2') {
        router.push('/login');
      } else if (errCode == '3') {
        router.push('/login');
      } else if (errCode == '5') {
        router.push('/login');
      } else if (errCode == '6') {
        router.push('/login');
      } else {
        router.push('/login');
      }
    } else if (res.status == 500) {
      alert('操作失败，服务器出错了');
    }
  }
}

  function refToken($this, func, refTokenRouter) {
    let refreshToken = utils.getCookie('refreshToken');
    if (refreshToken) {
      let params = {
        PRS: {
          refreshToken: refreshToken
        }
      }
      $this.Axios.get(refTokenRouter, params).then(res => {
        utils.setCookie("accessToken", res.data.data.accessToken);
        func();
      }).catch(err => {
        utils.goLogin()
      })
    } else {
      utils.goLogin()
    }
  }
  function formartParams(config, baseURL, appConfig) {
    let accessToken = localStorage.getItem('accessToken');
    let method = config.method.toUpperCase();
    let url = config.url;
    if (method == 'GET' || method == 'DELETE') {
      let PRS = config.PRS ? config.PRS : {};
      PRS.accessToken = accessToken;
      config.PRS = PRS;
      let params = utils.fomartParams(config.PRS);
      url = config.url + (true ? '?': '') + params;
      config.url = url;
    } else if (method == 'PUT' || method == 'POST') {
      config.data = config.data ? config.data : {};
      let isFormdata = 'append' in config.data
      if (isFormdata) {
        config.data.append('accessToken', accessToken);
      } else {
        config.data.accessToken = accessToken;
      }
    }
  }


  Vue.prototype.Axios = Axios;
  Vue.prototype.extCatch = extCatch;

  