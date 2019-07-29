// 多态
// let GoogleMap = {
//   show() {
//     console.log('Google Map Beginning');
//   }
// };
//
// let BaiduMap = {
//   show() {
//     console.log('Baidu Map Beginning');
//   }
// };
//
// let renderMap = (map) => {
//   if (map.show instanceof Function) {
//     map.show();
//   }
// };
//
// renderMap(GoogleMap);
// renderMap(BaiduMap);


// 封装
// 封装数据
// var myObject = (function () {
//   var __name = 'wsm';  // private 变量
//   return {
//     getName: function () {  // public 方法
//       return __name;
//     }
//   };
// })();
//
// console.log(myObject);

// 原型模式
// var Plane = function () {
//   this.blood = 100;
//   this.attacklevel = 1;
//   this.defenselevel = 1;
// };
//
// var plane = new Plane();
// plane.blood = 66;
// plane.attacklevel = 7;
// plane.defenselevel = 5;
//
// var clonePlane = Object.create(plane);
// console.log(clonePlane);

// 闭包应用
// var mult = (function () {
//   var cache = {};
//   var calculate = function () {
//     var a = 1;
//     for ( var i = 0, l = arguments.length ; i < l; i++) {
//       a = a * arguments[i];
//     }
//     return a;
//   };
//   return function () {
//     console.log(cache);
//     var args = Array.prototype.join.call(arguments, ',');
//     if (args in cache) {
//       return cache[args];
//     }
//     return cache[args] = calculate.apply(null, arguments);
//   };
// })();
//
//
// console.log(mult(1, 2, 3));
// console.log(mult(1, 3, 2));

// var appendDiv = function (callback) {
//   for (var i = 0;i < 100; i++) {
//     var div = document.createElement('div');
//     div.innerHTML = i;
//     document.body.appendChild(div);
//     if (typeof callback === Function) {
//       callback(div);
//     }
//   }
// };
//
// appendDiv(function (node) {
//   node.style.display = 'none';
// });
//

// var isType = function (type) {
//   return function (obj) {
//     return Object.prototype.toString.call(obj) === `[object ${type}]`
//   }
// }
//
// var isString = isType('String').call(this)
// var isArray = isType('Array')
// var isNumber = isType('Number')
//
// console.log(isArray([1, 2, 3]))

// Function.prototype.before = function (beforefn) {
//   var __self = this    // 保留原函数引用
//   return function () {   // 返回原函数和新函数的代理函数
//     beforefn.apply(this, arguments)   // 执行新函数
//     return __self.apply(this, arguments) // 执行原函数
//   }
// }
//
// Function.prototype.after = function (afterfn) {
//   var __self = this
//   return function () {
//     var ret = __self.apply(this, arguments)
//     afterfn.apply(this, arguments)
//     return ret
//   }
// }
//
// func = function () {
//   console.log(2)
// }
//
// func = func.before(() => {console.log(1)}).after(() => {console.log(3)})

// func()
//
// var throttle = function (fn, interval = 300) {
//   var firstTime = true, timer
//   return function () {
//     if (firstTime) {
//       fn.apply(this, arguments)
//       firstTime = false
//     }
//     if (timer) return
//     timer = setTimeout(() => {
//       fn.apply(this, arguments)
//       clearTimeout(timer)
//       timer = null
//     }, interval)
//   }
// }
//
// window.onresize = throttle(function () {
//   console.log(1)
// }, 500)

// var timeChunk = function (ary, fn, count) {
//   var t
//
//   var start = function () {
//     for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
//       var obj = ary.shift()
//       fn(obj)
//     }
//   }
//
//   return function () {
//     t = setInterval(function () {
//       if (ary.length === 0) {
//         return clearInterval(t)
//       }
//       start()
//     }, 200)
//   }
//
// }
//
// var ary = []
//
// for (var i = 0; i < 15; i++){
//   ary.push(i)
// }
//
// var renderFriendList = timeChunk(ary, function () {
//   console.log(1)
// }, 8)
//
//
// renderFriendList()


// var addEvent = function (elem, type, handler) {
//   if (window.addEventListener) {
//     addEvent = function (elem, type, handler) {
//       elem.addEventListener(type, handler, false)
//     }
//   } else if (window.attachEvent) {
//     addEvent = function (elem, type, handler) {
//       elem.attachEvent('on' + type, handler)
//     }
//   }
//   addEvent(elem, type, handler) // 第一次调用执行
// }
//
// var div = document.getElementById('div1')
//
// addEvent(div, 'click', function () {
//   alert(1)
// })
//
// addEvent(div, 'click', function () {
//   alert(2)
// })


// var namespace1 = {
//   a: function () {
//     console.log(1)
//   },
//   b: function () {
//     console.log(2)
//   }
// }


// var MyApp = {}
//
// MyApp.namespace = function (name) {
//   var parts = name.splice('.')
//   var current = MyApp
//   for (var i in parts) {
//     if (!current[parts[i]]) {
//       current[parts[i]] = {}
//     }
//     current = current[parts[i]]
//   }
// }
//
// MyApp.namespace('event')
// MyApp.namespace('dom.style')
//
// // 等价于
// var MyApp = {
//   event: {},
//   dom: {
//     style: {}
//   }
// }


// var user = (function () {
//   var __name = 'seven',
//       __age = 29
//   return {
//     getUserInfo: function () {
//       return __name + '-' + __age
//     }
//   }
// })()





