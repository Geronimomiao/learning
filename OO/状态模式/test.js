var OffLightState = function (light) {
  this.light = light;
};

OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
};

var WeakLightState = function (light) {
  this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光');
  this.light.setState(this.light.strongLightState);
};

var StrongLightState = function (light) {
  this.light = light;
};

StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关灯');
  this.light.setState(this.light.offLightState);
};

var Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button'),
    self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';

  this.currState = this.offLightState;
  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  };
};

Light.prototype.setState = function (newState) {
  this.currState = newState;
};

var light = new Light();
light.init();

// Light() 状态类
// 状态对象也需要持有对 Light() 对象的引用
// 在状态类中定义一些共同的行为方法 在本列中 buttonWasPressed
// 则无论增加多少状态类 都要实现  buttonWasPressed 方法 但遗憾的是 javascript 没有抽象类或接口概念

var State = function () {};
State.prototype.buttonWasPressed = function () {
  throw new Error('父类的 buttonWasPressed 方法必须重写');
};

var SuperStrongLightState = function (light) {
  this.light = light;
};

StrongLightState.prototype = new State(); // 继承抽象父类
StrongLightState.prototype.buttonWasPressed = function () {  // 重写 buttonWasPressed 方法
  console.log('关灯');
  this.light.setState(this.light.offLightState);
};




