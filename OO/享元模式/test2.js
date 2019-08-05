// 在 Web 前端开发中 对象池使用最多的场景大概就是和 DOM 操作相关
// 很多空间和时间都消耗到 DOM 上
// 如何避免频繁的创建和删除 DOM 节点就成了一个很有意义的话题

var toolTipFactory = (function () {
  var toolTipPool = [];

  return {
    create: function () {
      if (toolTipPool.length === 0) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        return div;
      } else {
        return toolTipPool.shift();
      }
    },
    recover: function (tooltipDom) {
      return toolTipPool.push(tooltipDom);
    }
  };
})();

var ary = [];  // 为方便回收 通过 ary 记录
for (var i = 0, str; str = ['A', 'B'][i++]; ) {
  var toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
  ary.push(toolTip);
}

// 假设地图需要重绘 将之前的节点回收至对象池
for (var i = 0, toolTip; toolTip = ary[i++]; ) {
  toolTipFactory.recover(toolTip);
}

for (var i = 0, str; str = ['C', 'B', 'C', 'D', 'E'][i++]; ) {
  var toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
  ary.push(toolTip);
}

// 通用对象池实现
var objectPoolFactory = function (createObjFn) {
  var objectPool = [];
  return {
    create: function () {
      // if (objectPool.length === 0) {
      //   return createObjFn.apply(this, arguments);
      // } else {
      //   return objectPool.shift();
      // }
      // console.log(objectPool);
      var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
      return obj;
    },
    recover: function (obj) {
      objectPool.push(obj);
    }
  };
};

// 仅进行对象创建
var  iframeFactory = objectPoolFactory(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);

  iframe.onload = function () {
    iframe.onload = null;  // 防止 iframe 重复加载的 bug
    iframeFactory.recover(iframe); // 加载完再回收
  };

  return iframe;
});


var iframe1 = iframeFactory.create(); // 仅获取一个对象(可以当成一个未初始化的对象
iframe1.src = 'http://baidu.com';

setTimeout(function () {
  var iframe3 = iframeFactory.create();
  iframe3.src = 'http://baidu.com';
}, 3000);     // 创建新的会覆盖之前用的
