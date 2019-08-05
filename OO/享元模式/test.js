// 传统
var id = 0;  // 每个文件的唯一标示

window.startUpLoad = function (uploadType, files) {
  for (var i = 0, file; file = files[i++];) {
    // 每有一个文件均会新建一个对象
    var uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
    uploadObj.init(id++);
  }
};

var Upload = function (uploadType, fileName, fileSize) {
  this.uploadType = uploadType;
  this.fileName = fileName;
  this.fileSize = fileSize;
  this.dom = null;
};

Upload.prototype.init = function (id) {
  var that = this;
  this.id = id;
  this.dom = document.createElement('div');
  this.dom.innerHTML = `<span>文件名称: ${this.fileName}  文件大小: ${this.fileSize}</span> <button class="delFile">删除</button>`;
  this.dom.querySelector('.delFile').onclick = function () {
    that.delFile();
  };
  document.body.appendChild(this.dom);
};

Upload.prototype.delFile = function () {
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }
  if (window.confirm('确定要删除文件吗?' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom);
  }
};

startUpLoad('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000
  },
  {
    fileName: '2.txt',
    fileSize: 14000
  },
  {
    fileName: '3.txt',
    fileSize: 2000
  },
]);

startUpLoad('flash', [
  {
    fileName: '5.txt',
    fileSize: 1000
  },
  {
    fileName: '6.txt',
    fileSize: 14000
  },
  {
    fileName: '7.txt',
    fileSize: 22000
  },
]);

// 使用享元模式 进行重构
// 区分 外部状态 和 内部状态
// 内部状态储存于对象内部 可以被一些对象共享 独立于具体场景 通常不会被改变
// 外部状态取决于具体场景 并根据场景变化而变化 外部状态不能被共享

// 剥离外部状态
var Upload = function (uploadType) {
  this.uploadType = uploadType;
};

Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this);
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }
  if (window.confirm('确定要删除该文件?' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom);
  }
};

// 工厂进行对象实例化
// 如果某种内部状态对应的共享对象已经被创建过 那么直接返回这个对象 否则则创建一个新对象

var UploadFactory = (function () {
  var createFlyWeightObjs = {};

  return {
    create: function (uploadType) {
      if (createFlyWeightObjs[uploadType]) {
        return createFlyWeightObjs[uploadType];
      }
      return createFlyWeightObjs[uploadType] = new Upload(uploadType);
    }
  };
})();


// 管理器封装外部状态
// 负责向 UploadFactory 提交创建对象的请求 并用一个 uploadDatabase 对象保存所有 upload 对象的外部状态
// 以便在程序运行过程中给 upload 共享对象设置外部状态

var uploadManager = (function () {
    var uploadDatabase = {};
    return {
      add: function (id, uploadType, fileName, fileSize) {
        var flyWeightObj = UploadFactory.create(uploadType);
        var dom = document.createElement('div');
        dom.innerHTML = `<span>文件名称:${fileName},文件大小:${fileSize}</span>
                         <button class="delFile">删除文件</button>`;
        dom.querySelector('.delFile').onclick = function () {
          flyWeightObj.delFile(id);
        };
        document.body.appendChild(dom);
        uploadDatabase[id] = {
          fileName: fileName,
          fileSize: fileSize,
          dom: dom
        };

        return flyWeightObj;
      },

      setExternalState: function (id, flyWeightObj) {
        var uploadData = uploadDatabase[id];
        for (var i in uploadData) {
          flyWeightObj[i] = uploadData[i];
        }
      }
    };
})();

var id = 0;

window.startUpload = function (uploadType, files) {
  for (var i = 0, file; file = files[i++];) {
    var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
  }
};

startUpload('plugin', [
  {
    fileName: '5.txt',
    fileSize: 1000
  },
  {
    fileName: '6.txt',
    fileSize: 14000
  },
  {
    fileName: '7.txt',
    fileSize: 22000
  }
]);










