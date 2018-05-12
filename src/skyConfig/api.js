import Vue from 'vue';

//数组去重事件
Array.prototype.unique = function () {
  var ret = [];
  for (var i = 0; i < (this.length - 1); i++) {
    var textTF = true
    for (var j = i + 1; j < this.length; j++) {
      if (this[i].text == this[j].text) {
        textTF = false
        break
      }
    }
    if (textTF) {
      ret.push(this[i])
    }
  }
  return ret;
}

export default {
  //保留两位小位方法
  returnFloat(value) {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (xsd.length > 1) {
      if (xsd[1].length < 2) {
        value = value.toString() + "0";
      }
      return value;
    }
  },
  //日期格式化（YYYY-MM-DD)
  dateGetDay(value) {
    var ret = ""
    if (value != undefined) {
      var date = new Date(value)
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      ret = Y + M + D
    }
    return ret
  },
  // 上传
  commonUpload($this, e, type, url, cb, err) {
    let formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('type', type)
    $this.$xios
    .post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(res => {
      let result = res.data
      if (result.code == 200) {
        cb(result)
      } else {
        err(result)
      }
    })
  },
}
