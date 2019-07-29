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

