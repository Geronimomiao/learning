// 找到一个对象 通过克隆创造一个一模一样的对象
var Plane = function () {
  this.blood = 100;
  this.attacklevel = 1;
  this.defenselevel = 1;
};

var plane = new Plane();
plane.blood = 66;
plane.attacklevel = 7;
plane.defenselevel = 5;

var clonePlane = Object.create(plane);
console.log(clonePlane);
