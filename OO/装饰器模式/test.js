// 普通做法
window.onload = function () {
  alert(1);
};
// 给 onload 绑定方法 又不确定 这个事件是不是已经被人绑定过
// 保留原先的引用 将其放入新的 onload 中执行
// 必须维护 _onload 中间变量  this 劫持问题
var _onload = window.onload || function () {};
window.onload = function () {
  _onload();
  alert(2);
};


// 用 AOP 做装饰函数
Function.prototype.before = function (beFn) {
  var self = this;  // Function
  return function () {
    beFn.apply(this, arguments); // 同 Function 的 this
    return self.apply(this, arguments);
  };
};

Function.prototype.after = function (afFn) {
  // console.log(this)
  var self = this;
  return function () {
    // console.log(this);
    var ret = self.apply(this, arguments);
    afFn.apply(this, arguments);
    return ret;
  };
};

window.onload = function () {
  alert(1);
};

window.onload = (window.onload || function () {}).after(function () {
  // console.log(this)
  alert(2);
});
// .after() 相当于调用并执行
// 此时的 window.onload 为
// ƒ () {
//     console.log(this);
//     var ret = self.apply(this, arguments);
//     afFn.apply(this, arguments);
//     return ret;
//   }
// 所以不存在 this 劫持问题

window.onload();

// but 很多人这种污染原型的方式 我们可以做一些变通
var before = function (fn,  beforefn) {
  return function () {
    beforefn.apply(this, arguments);
    fn.apply(this, arguments);
  };
};

var after = function (fn, afterfn) {
  return function () {
    fn.apply(this, arguments);
    afterfn.apply(this, arguments);
  };
};

var a = before(function () {
  alert(2);
}, function () {
  alert(1);
});

a = before(a, function () {
  alert(0);
});











