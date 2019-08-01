var Folder = function (name) {
  this.name = name;
  this.parent = null;
  this.files = [];
};

Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log('开始扫描文件夹:' + this.name);
  for (var i = 0, file; file = this.files[i++];) { // maybe GG
    file.scan();
  }
};

Folder.prototype.remove = function () {
  if (!this.parent) {
    return ;  // 根结点 或 游离节点
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l];
    if (file === this) {
      // console.log(111)
      files.splice(l, 1);
    }
  }
};

var File = function (name) {
  this.name = name;
  this.parent = null;
};

File.prototype.add = function () {
  throw new Error('不能添加在文件下面');
};

File.prototype.scan = function () {
  console.log('开始扫描文件' + this.name);
};

File.prototype.remove = function () {
  if (!this.parent) return;
  for (var i = 0, file; file = this.parent.files[i++]; ) {
    if (file === this) {
      this.parent.files.splice(l, 1);
    }
  }
};

var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file = new File('README.md');
var file1 = new File('深入浅出 node.js');

folder.add(folder1);
folder1.add(file1);
folder.add(file);

// 可对任意一个节点执行操作
// 方便的添加删除
// folder.scan();
// file1.scan();

folder1.remove();
folder.scan();































