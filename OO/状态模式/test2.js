var Light = function () {
  this.currState = FSM.off;
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button'),
    self = this;
  button.innerHTML = '点我开灯';
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    // console.log(self.currState)
    self.currState.buttonWasPressed.call(self);
  };
};

var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯');
      this.button.innerHTML = '点我开灯';
      this.currState = FSM.on;
    }
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯');
      this.button.innerHTML = '点我关灯';
      this.currState = FSM.off;
    }
  }
};


var light = new Light();
light.init();
