// 内部迭代器
var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i])
  }
}

each([1, 2, 3], function (i, n) {
  console.log(i, n)
})

// 外部迭代器
// 比较两数组元素是否相等
var Iterator = function (obj) {
  var current = 0

  var next = function () {
    current += 1
  }

  var isDone = function () {
    return current >= obj.length
  }

  var getCurrentItem = function () {
    return obj[current]
  }

  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem
  }
}

var compare = function (iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new Error('iterator1 同 iterator2 不相等')
    }
    iterator1.next()
    iterator2.next()
  }
  console.log('iterator1 同 iterator2 相等')
}

var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 3])

compare(iterator1, iterator2)

// 迭代类数组对象 和 字面量对象
$.each = function (obj, callback) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike(obj);

  if (isArray) {
    for (; i < length; i++) {
     value = callback(obj[i], i, obj[i])
     if (value === false) {
       break
     }
    }
  } else {
    for (i in obj) {  // 迭代 object 对象
      value = callback(obj[i], i, obj[i])
      if (value === false) {
        break
      }
    }
  }
  return obj
}


