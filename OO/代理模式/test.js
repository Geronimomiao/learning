// 图片懒加载

var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  
  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (function () {
  var img = new Image
  // console.log(img)
  img.onload = function (src) {
    myImage.setSrc(this.src)
  }

  return {
    setSrc: function (src) {
      myImage.setSrc('file:// /xxxxx/xxxx.git')
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://dffggdg/dsffgg/gdfgdds.jpg')

// 缓存代理
// 可以缓存 ajax 的异步数据
var mult = function () {
  console.log('开始计算乘积')
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++ ) {
    a = a * arguments[i]
  }
  return a
}

var proxyMult = (function () {
  var cache = {}

  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()

console.log(proxyMult(1,2,3,4))
console.log(proxyMult(1,2,3,4))


// 通过高阶函数动态创建代理
var mult = function () {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a*arguments[i]
  }
  return a
}

var plus = function () {
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a+arguments[i]
  }
  return a
}

var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments,',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus)

