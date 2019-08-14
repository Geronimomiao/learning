var plugin = (function () {
  var plugin = document.createElement('embed');
  plugin.style.display = 'none';
  plugin.type = 'application/txftn-webkit';

  plugin.sign = function () {
    console.log('文件开始扫描');
  };

  plugin.pause = function () {
    console.log('暂停文件上传');
  };

  plugin.uploading = function () {
    console.log('开始文件上传');
  };

  plugin.del = function () {
    console.log('删除上传文件');
  };

  plugin.done = function () {
    console.log('文件上传完成');
  };

  document.body.appendChild(plugin);

  return plugin;
})();

// 构造 Upload 函数
var Upload = function (fileName) {
  this.plugin = plugin;
  this.fileName = fileName;
  this.button1 = null;
  this.button2 = null;
  this.signState = new SignState(this);
  this.uploadingState = new UploadingState(this);
  this.pauseState = new PauseState(this);
  this.doneState = new DoneState(this);
  this.errorState = new ErrorState(this);
  this.currState = this.signState; // 设置当前初始状态
};

Upload.prototype.init = function () {
  var that = this;

  this.dom = document.createElement('div');
  this.dom.innerHTML =
    `
    <span>文件名称: ${this.fileName}</span>
    <button data-action="button1">扫描中</button>
    <button data-action="button2">删除</button>
    `;

  document.body.appendChild(this.dom);
  this.button1 = this.dom.querySelector('[data-action="button1"]');
  this.button2 = this.dom.querySelector('[data-action="button2"]');

  this.bindEvent();
};

// 当点击按钮之后 Context 并不需要做任何具体操作 而是把请求 委托给当前的状态类来执行
Upload.prototype.bindEvent = function () {
  var self = this;
  this.button1.onclick = function () {
    self.currState.clickHandler1();
  };
  this.button2.onclick = function () {
    self.currState.clickHandler2();
  };
};

Upload.prototype.sign = function () {
  this.plugin.sign();
  this.currState = this.signState;
};

Upload.prototype.uploading = function () {
  this.button1.innerHTML = '正在上传文件 点击暂停';
  this.plugin.uploading();
  this.currState = this.uploadingState;
};

Upload.prototype.pause = function () {
  this.button1.innerHTML = '已暂停 点击继续上传';
  this.plugin.pause();
  this.currState = this.pauseState;
};

Upload.prototype.done = function () {
  this.button1.innerHTML = '上传完成';
  this.plugin.done();
  this.currState = this.doneState;
};

Upload.prototype.error = function () {
  this.button1.innerHTML = '上传失败';
  this.currState = this.errorState;
};

Upload.prototype.del = function () {
  this.plugin.del();
  this.dom.parentNode.removeChild(this.dom);
};

// 编写各个状态类的实现
var StateFactory = (function () {
  var State = function () {};

  State.prototype.clickHandler1 = function () {
    throw new Error('子类必须重写父类的 clickHander1 方法');
  };

  State.prototype.clickHandler2 = function () {
    throw new Error('子类必须重写父类的 clickHander2 方法');
  };

  return function (param) {
    var F = function (uploadObj) {
      this.uploadObj = uploadObj;
    };

    F.prototype = new State();

    for (i in param) {
      F.prototype[i] = param[i];
    }
    return F;
  };

})();

var SignState = StateFactory({
  clickHandler1: function () {
    console.log('扫描中 点击无效');
  },
  clickHandler2: function () {
    console.log('文件正在上传 不得删除');
  }
});

var UploadingState = StateFactory({
  clickHandler1: function () {
    this.uploadObj.pause();
  },
  clickHandler2: function () {
    console.log('文件正在上传 不得删除');
  }
});

var PauseState = StateFactory({
  clickHandler1: function () {
    this.uploadObj.uploading();
  },
  clickHandler2: function () {
    this.uploadObj.del();
  }
});

var DoneState = StateFactory({
  clickHandler1: function () {
    console.log('文件已经完成上传 点击无效');
  },
  clickHandler2: function () {
    this.uploadObj.del();
  }
});

var ErrorState = StateFactory({
  clickHandler1: function () {
    console.log('文件上传失败 点击无效');
  },
  clickHandler2: function () {
    this.uploadObj.del();
  }
});



var uploadObj = new Upload('JS设计模式与开发实践');
uploadObj.init();

// 在页面中模拟上插件
window.external.upload = function (state) {
  uploadObj[state]();
};

window.external.upload('sign');

setTimeout(function () {
  window.external.upload('uploading');
},1000);

setTimeout(function () {
  window.external.upload('done');
},3000);

