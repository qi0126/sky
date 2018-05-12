import Vue from 'vue';

//接口服务器端口
const portServer = "http://192.168.16.44:6680"

const portUrl = "http://192.168.21.122:9091"//郭煜服务器
const portUser = 'http://192.168.21.38:8082'//郭志刚服务（用户）
const portBYB = 'http://192.168.21.46:8081/stock/'//白欲波服务
const portPro = 'http://192.168.21.185:8081'//夏文浩(产品)
const portImg = 'http://192.168.21.92/'//图片服务器地址


const daySelectData = {
  //日期选择期关键字
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
}


Vue.prototype.portServer = portServer;
Vue.prototype.portUrl = portUrl;
Vue.prototype.portUser = portUser;
Vue.prototype.portBYB = portBYB;
Vue.prototype.portPro = portPro;
Vue.prototype.portImg = portImg;
Vue.prototype.daySelectData = daySelectData;

