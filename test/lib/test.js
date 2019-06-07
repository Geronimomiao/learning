'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pro = function () {
  function Pro(fn) {
    _classCallCheck(this, Pro);

    console.log(fn);
    this.arr = [];
    this.count = -1;
    fn(this);
  }

  _createClass(Pro, [{
    key: 'then',
    value: function then(r) {
      if (typeof r === 'function') {
        this.arr.push(r);
        console.log(this);
        return this;
      } else {
        console.log(111);
        this.arr[++this.count] && this.arr[this.count](this, r);
      }
    }
  }]);

  return Pro;
}();

new Pro(function (fn) {
  console.log(fn);
  // 此处fn 即为class 中的 this
  setTimeout(function () {
    var data = 1; // 举例数据为1
    console.log('A拿到数据后，进行处理', data);
    console.log('A将数据传到下一个ajax');
    console.log('A-------------');
    fn.then(data);
  }, 500);
}).then(function (q, r) {
  console.log('A上一个数据是', r);
  setTimeout(function () {
    var data = 2;
    console.log('A拿到数据后，进行处理', data);
    console.log('A将数据传到下一个ajax');
    console.log('A-------------');
    console.log(q);
    q.then(data);
  }, 500);
}).then(function (fn, r) {
  console.log('A上一个数据是', r);
  setTimeout(function () {
    var data = 3;
    console.log('A拿到数据后，进行处理', data);
    console.log('A将数据传到下一个ajax');
    console.log('A-------------');
    fn.then(data);
  }, 500);
}).then(function (fn, r) {
  console.log('A上一个数据是', r);
  setTimeout(function () {
    var data = 4;
    console.log('A拿到数据后，进行处理', data);
  }, 500);
});