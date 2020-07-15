const App = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  RequestBySessionId: RequestBySessionId,
}

function RequestBySessionId(requestParam){


  console.log('接收' + requestParam.header);
  //三个默认参数的值
  var method = "GET";
  var dataType = "json";
  var responseType = "text";
  //用户输入了参数就替换，没输入就使用默认的
  if ("method" in requestParam)
  {
    method = requestParam.method;
  }
  if ("dataType" in requestParam) {
    dataType = requestParam.dataType;
  }
  if ("responseType" in requestParam) {
    responseType = requestParam.responseType;
  }

  var url = requestParam.url;
  var data = requestParam.data;
  var success = requestParam.success;
  var fail = requestParam.fail;
  var complete = requestParam.complete;

  var cookieStr = "";  //请求报文头中cookie的字符串

  var Cookie = App.globalData.cookie;  //获取全局变量中的cookie内容
  cookieStr = Cookie;

  var header = {};
  console.log('改变前cookie' + header["cookies"]);
  if ("header" in requestParam)
  {
    header = requestParam.header;
    header["cookies"] = cookieStr;
  }
  else
  {
    header["cookies"] = cookieStr;
  }

  console.log('改变后cookie' + header["cookie"]);
  
  wx.request({
    url: url,
    method: method,
    responseType: responseType,
    dataType: dataType,
    data: data,
    header: header,    //每次请求带上sessionId
    success: function(res){

      //先将检查服务器返回报文头中有无sessionId，有则存到全局变量中
      var cookie = res.header["Set-Cookie"];
      var cookies = res.cookies;
      console.log('Set-Cookie=' + cookie);
      console.log('cookies=' + cookies);
      if ('' == App.globalData.cookie)
      {
        var sessionPos;
        console.log('cookie=' + App.globalData.cookie);
        if ((sessionPos = cookie.indexOf("JSESSIONID=")) != -1) {
          
          //每次请求成功都将sessionId存入全局变量
          App.globalData.cookie = cookie.substring(sessionPos, 42);

        }
        console.log('cookie=' + App.globalData.cookie);
      }
      //执行正常的操作
      success(res);
    },
    fail: fail,
    complete: complete,
  });
}
