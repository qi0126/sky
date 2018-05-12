import axios from 'axios';
export default {
  //post请求封装方法
  post(url, params) {
    axios.post(url,params)
    .then(function(res) {
      if (res.data.code == 200) {
        console.log(res.data.data)
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  //get请求封装方法
  get(url) {
    axios.get(url)
    .then(function(res) {
      if (res.data.code == 200) {
        console.log(res.data.data)
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}
