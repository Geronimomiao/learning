// 发布-订阅 模式
var event = {
  clientList: {}, // 缓存列表 存放订阅者的回调函数
  listen: function (key, fn) { // 订阅事件
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function () { // 发布事件
    var key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++]; ) {
      fn.apply(this, arguments);
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) {  // 如果 key 对应的消息无人订阅
      return false
    }
    if (!fn) {  // 如果没有传入具体的回调函数 表示需要取消 key 对应消息的所以订阅
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length-1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  }
};

var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88', fn1 = function (price) { // 订阅者1
  console.log('价格=' + price);
});

salesOffices.listen('squareMeter88', fn2 = function (price) { // 订阅者2
  console.log('价格=' + price);
});

salesOffices.trigger('squareMeter88', 20000); // 发布消息

salesOffices.remove('squareMeter88', fn1); // 取消订阅

salesOffices.trigger('squareMeter88', 20000); // 发布消息
