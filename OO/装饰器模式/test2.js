// 模拟发送请求 且 需要 token 的例子
// 传统写法
/*
*  缺点：
*    不宜封装 不易复用
* */
var ajax = function (type, url, param) {
  param = param || {};
  param.Token = getToken();
};

//  AOP
Function.prototype.before = function (beFn) {
  var self = this;  // Function
  return function () {
    beFn.apply(this, arguments); // 同 Function 的 this
    return self.apply(this, arguments); // 返回原函数的执行结果
  };
};

var ajax = function (type, url ,param) {
  console.log(param);
};

var getToken = function () {
  return 'Token';
};

ajax = ajax.before(function (type, url, param) {
  param.token = getToken();
});

// ajax.before(function (type, url, param) {
//   param.token = getToken();
// });
// 仅返回你要的目标函数 你需要用变量接收

ajax('get', 'ghijufsdgfsdiughf.com', {name: 'wsm'});

