var Beverage = function (param) {
  var boilWater = function () {
    console.log('把水煮沸');
  };
  var pourInCup = param.pourInCup || function () {
    throw new Error('必须传递 pourInCup 方法');
  };
  var F = function () {};
  F.prototype.init = function () {
    boilWater();
    pourInCup();
  };
  return F;
};

var Water = Beverage({
  pourInCup: function () {
    console.log('将水倒入杯中');
  }
});

var water = new Water();
console.log(Water);
console.log(Water);

water.init();

