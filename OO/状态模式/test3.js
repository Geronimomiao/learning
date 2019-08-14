var delegate = function (client, delegation) {
  return {
    buttonWasPressed: function () {
      return delegation.buttonWasPressed.apply(client, arguments);
    }
  };
};

var FSM = {
  on: {
    buttonWasPressed: function () {
      console.log('已关灯');
      this.button.innerHTML = '下次点我是开灯';
      this.currState = this.offState;
    }
  },
  off: {
    buttonWasPressed: function () {
      console.log('已开灯');
      // console.log(this)
      this.button.innerHTML = '下次点我是关灯';
      this.currState = this.onState;
    }
  }
};

var Light = function () {
  this.offState = delegate(this, FSM.off);
  this.onState = delegate(this, FSM.on);
  this.currState = this.offState;
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button');
  var self = this;
  button.innerHTML = '已关灯' ;
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  };
};

var light = new Light();
light.init();

