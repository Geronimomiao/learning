Function.prototype.before = function (beforeFn) {
  var _self = this;
  return function () {
    if (beforeFn.apply(this, arguments) === false) {
      return;  // beforeFn 返回 false 直接 return 不执行后面的原函数
    }
    return _self.apply(this, arguments);
  };
};

var validata = function () {
  if (username.value === '') {
    alert('用户名不能为空');
    return false;
  }
  if (password.value === '') {
    alert('密码不能为空');
    return false;
  }
};

var formSubmit = function () {
  var param = {
    username: username.value,
    password: password.value
  };
  ajax('http://fvhjisfhysioufyhg.com', param);
};

formSubmit = formSubmit.before(validata);

submitBtn.onclick = function () {
  formSubmit();
};



