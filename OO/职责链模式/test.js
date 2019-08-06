/*
*  情景：
*     公司对支付定金对用户有一定优惠政策
*     已经支付 500 定金元用户 会收到 100 元优惠卷
*     已经支付 200 定金元用户 会收到 50 元优惠卷
*     未支付定金的用户 只能进入普通模式 且库存有限的情况 不一定保证能买的到
* */

/*
*  orderType 表示订单类型
*       1  500 元定金用户
*       2  200 元定金用户
*       3  普通购买者
*  pay 表示用户是否已经支付定金 值为 true 或 false
*       若未支付定金 则会降级到普通购买模式
*  stock 表示当前用于购买的普通手机的库存数量
*       如果为已支付定金的用户则不受此限制
* */

// 传统写法 大量 if else 嵌套 不易维护
var order = function (orderType, pay, stock) {
  if (orderType === 1) {

  } else if (orderType === 2) {

  } else if (orderType === 3) {

  }
};

// 用职责链模式重构代码
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

var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor;
};

Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments);
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
};

// 建立3个 节点
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 将节点串成链
chainOrder500.setNextSuccessor(chainOrder200).setNextSuccessor(chainOrderNormal);


chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(2, false, 0);


















