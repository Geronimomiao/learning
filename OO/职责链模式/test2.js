// 异步职责链

var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor;    // 将传入节点 和 当前节点 链接在一起
};

Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }

  return ret;
};

// 节点有权利决定什么时候 把请求交给下一个节点
Chain.prototype.next = function () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

var fn1 = new Chain(function () {
  console.log(1);
  return 'nextSuccessor';
});

var fn2 = new Chain(function () {
  console.log(2);
  setTimeout(() => {
    this.next();
  }, 2000);
});

var fn3 = new Chain(function () {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);

fn1.passRequest();

