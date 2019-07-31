// 发布-订阅 模式
// var event = {
//   clientList: {}, // 缓存列表 存放订阅者的回调函数
//   listen: function (key, fn) { // 订阅事件
//     if (!this.clientList[key]) {
//       this.clientList[key] = [];
//     }
//     this.clientList[key].push(fn);
//   },
//   trigger: function () { // 发布事件
//     var key = Array.prototype.shift.call(arguments),
//       fns = this.clientList[key];
//     if (!fns || fns.length === 0) {
//       return false;
//     }
//     for (var i = 0, fn; fn = fns[i++]; ) {
//       fn.apply(this, arguments);
//     }
//   },
//   remove: function (key, fn) {
//     var fns = this.clientList[key];
//     if (!fns) {  // 如果 key 对应的消息无人订阅
//       return false
//     }
//     if (!fn) {  // 如果没有传入具体的回调函数 表示需要取消 key 对应消息的所以订阅
//       fns && (fns.length = 0);
//     } else {
//       for (var l = fns.length-1; l >= 0; l--) {
//         var _fn = fns[l];
//         if (_fn === fn) {
//           fns.splice(l, 1);
//         }
//       }
//     }
//   }
// };
//
// var installEvent = function (obj) {
//   for (var i in event) {
//     obj[i] = event[i];
//   }
// };
//
// var salesOffices = {};
// installEvent(salesOffices);
//
// salesOffices.listen('squareMeter88', fn1 = function (price) { // 订阅者1
//   console.log('价格=' + price);
// });
//
// salesOffices.listen('squareMeter88', fn2 = function (price) { // 订阅者2
//   console.log('价格=' + price);
// });
//
// salesOffices.trigger('squareMeter88', 20000); // 发布消息
//
// salesOffices.remove('squareMeter88', fn1); // 取消订阅
//
// salesOffices.trigger('squareMeter88', 20000); // 发布消息


// 使用一个全局对象实现
// 订阅者 不需要了解消息来自那个发布者 发布者也不用知道消息会推给那些订阅者
var Event = (function () {
  var clientList = {},
    listen,
    trigger,
    remove;

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function () {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };

  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn =fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }

})();

Event.listen('wsm', function (bar) {
  console.log(bar);
});

Event.trigger('wsm', 'hahaha');

// 先发布 后订阅 也能执行
// 为避免命名冲突 增加命名空间的功能

// GG 爆炸
// var Event = (function () {
//   var global = this,
//     Event,
//     _default = 'default';
//
//   Event = function () {
//     var _listen,
//       _trigger,
//       _remove,
//       _slice = Array.prototype.slice,
//       _shift = Array.prototype.shift,
//       _unshift = Array.prototype.unshift,
//       namespaceCache = {},
//       _create,
//       find,
//       each = function (ary, fn) {
//         var ret;
//         for (var i = 0, l = ary.length; i < l; i++) {
//           var n = ary[i];
//           ret = fn.call(n, i, n);
//         }
//         return ret;
//       };
//
//     _listen = function (key, fn, cache) {
//       if (!cache[key]) {
//         cache[key] = [];
//       }
//       cache[key].push(fn);
//     };
//
//     _remove = function (key, cache, fn ) {
//       if (cache[key]) {
//         if (fn) {
//           for (var i = cache[key].length; i >= 0; i--) {
//             if (cache[key][i] === fn) {
//               cache[key].splice(i, 1);
//             }
//           }
//         } else {
//           cache[key] = [];
//         }
//       }
//     };
//
//     _trigger = function () {
//       var cache = _shift.call(arguments),
//         key = _shift.call(arguments),
//         args = arguments,
//         _self = this,
//         ret,
//         stack = cache[key];
//       if (!stack || !stack.length) {
//         return;
//       }
//       return each(stack, function () {
//         return this.apply(_self, args);
//       });
//     };
//
//     _create = function (namespace) {
//       var namespace = namespace || _default;
//       var cache = {},
//         offlineStack = [],
//         ret = {
//           listen: function (key, fn, last) {
//             _listen(key, fn, cache);
//             if (offlineStack === null) {
//               return;
//             }
//             if (last === 'last') {
//               offlineStack.length && offlineStack.pop()();
//             } else {
//               each(offlineStack, function () {
//                 this();
//               });
//             }
//             offlineStack = null
//           },
//           one: function (key, fn, last) {
//             _remove(key, cache);
//             this.listen(key, fn, last);
//           },
//           remove: function (key, fn) {
//             _remove(key, cache, fn);
//           },
//           trigger: function () {
//             var fn,
//               args,
//               _self = this;
//             _unshift.call(arguments, cache);
//             args = arguments;
//             fn = function () {
//               return _trigger.apply(_self, args);
//             };
//             if (offlineStack) {
//               return _trigger.apply(_self, args);
//             }
//             return fn();
//           }
//         };
//       return namespace ? (namespaceCache[cache]?namespaceCache[cache]:namespaceCache[namespace] = ret) : ret;
//     };
//
//     return {
//       create: _create,
//       one: function (key, fn, last) {
//         var event = this.create();
//         event.one(key, fn, last);
//       },
//       remove: function (key, fn) {
//         var event = this.create();
//         event.remove(key, fn);
//       },
//       listen: function (key, fn, last) {
//         var event = this.create();
//         event.listen(key, fn, last);
//       },
//       trigger: function () {
//         var event = this.create();
//         event.trigger.apply(this, arguments);
//       }
//     };
//   }();
//   return Event
// })();
//
//
// Event.trigger('click', 1);
// Event.listen('click', function (a) {
//   console.log(a);
// });
