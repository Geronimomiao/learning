class Beverage {
  boilWater() {
   console.log('把水煮沸');
  }
  brew() {
    throw new Error('子类必须重写 brew 方法');
  }
  pourInCup() {
    throw new Error('子类必须重写 pourInCup 方法');
  }
  addCondiments() {
    throw new Error('子类必须重写 addCondiments 方法');
  }
  customerWantsCondiments() {
    return true;  // 默认需要调料
  }
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    }
  }
}

class CoffeeWithHook extends Beverage {
  brew() {
    console.log('用沸水冲泡咖啡');
  }
  pourInCup() {
    console.log('把咖啡倒进杯子');
  }
  addCondiments() {
    console.log('加糖和牛奶');
  }
  customerWantsCondiments() {
    return window.confirm('请问需要调料吗?');
  }
}


class TeaWithHook extends Beverage {
  brew() {
    console.log('用沸水浸泡茶叶');
  }
  pourInCup() {
    console.log('把茶叶倒进杯子');
  }
  addCondiments() {
    console.log('加柠檬');
  }
  customerWantsCondiments() {
    return window.confirm('请问需要加柠檬吗?');
  }
}

let coffee = new CoffeeWithHook();
let tea = new TeaWithHook();

coffee.init();
tea.init();

