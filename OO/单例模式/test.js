var a ={};

// 惰性单例
var getSingle = function(fn){
  var result
  return function(){
    return result || (result = fn.apply(this, arguments))
  }
}

var createLoginLayer = function(){
  var div = document.createElement('div')
  div.innerHTML = 'xxxx'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

document.getElementById('loginBtn').onclick = function(){
  var loginLayer = createSingleLoginLayer()
  loginLayer.style.display = 'block'
}


