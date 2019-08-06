var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 定金预购 得到 200 元 优惠卷');
  } else {
    return 'nextSuccessor';
  }
};

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200 定金预购 得到 50 元 优惠卷');
  } else {
    return 'nextSuccessor';
  }
};

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买 无优惠卷');
  } else {
    console.log('手机库存不足');
  }
};


// 用 AOP 实现职责链

Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  };
};

var order = order500.after(order200).after(orderNormal);

order(1, true, 500);
order(2, true, 500);
order(3, false, 0);











