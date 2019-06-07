class Pro {
  constructor(fn) {
    console.log(fn)
    this.arr = []
    this.count = -1
    fn(this)
  }

  then(r) {
    if (typeof (r) === 'function') {
      this.arr.push(r)
      console.log(this)
      return this
    } else {
      console.log(111)
      this.arr[++this.count] && this.arr[this.count](this, r)
    }
  }
}


new Pro(fn => {
  console.log(fn)
  // 此处fn 即为class 中的 this
  setTimeout(() => {
    let data = 1 // 举例数据为1
    console.log('A拿到数据后，进行处理', data)
    console.log('A将数据传到下一个ajax')
    console.log('A-------------')
    fn.then(data)
  }, 500)
})
  .then((q, r) => {
    console.log('A上一个数据是', r)
    setTimeout(() => {
      let data = 2
      console.log('A拿到数据后，进行处理', data)
      console.log('A将数据传到下一个ajax')
      console.log('A-------------')
      console.log(q)
      q.then(data)
    }, 500)
  })
  .then((fn, r) => {
    console.log('A上一个数据是', r)
    setTimeout(() => {
      let data = 3
      console.log('A拿到数据后，进行处理', data)
      console.log('A将数据传到下一个ajax')
      console.log('A-------------')
      fn.then(data)
    }, 500)
  })
  .then((fn, r) => {
    console.log('A上一个数据是', r)
    setTimeout(() => {
      let data = 4
      console.log('A拿到数据后，进行处理', data)
    }, 500)
  })
