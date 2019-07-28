// 事件实现异步

// class Evente {
//   constructor() {
//     this.map = {};
//   }
//
//   add(name, fn) {
//     if (this.map[name]) {
//       this.map[name].push(fn);
//       return this;
//     }
//     this.map[name] = [fn];
//     return this;
//   }
//
//   emit(name, ...args) {
//     this.map[name].forEach(fn => {
//       fn(...args);
//
//     });
//     return this;
//   }
// }
//
// let e = new Evente();
// e.add('hello', (err, name) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(name);
// }).emit('hello', 'GG')
//   .emit('hello', null, 'hello message');

// 观察者模式实现异步

// function create(fn) {
//   // 返回一个接收3个参数的函数
//   let ret = false;
//   return ({next, complete, error}) => {
//     function nextFn(...args) {
//       if (ret) {
//         return;
//       }
//       next(...args);
//     }
//
//     function completeFn(...args) {
//       complete(...args);
//       ret = true;
//     }
//
//     function errorFn(...args) {
//       error(...args);
//     }
//
//     fn({
//       next: nextFn,
//       complete: completeFn,
//       error: errorFn
//     });
//
//     return () => (ret = true);
//   };
// }
//
// // observerable 接收3个参数的函数
// let observerable = create(observer => {
//   // console.log(observer)
//   setTimeout(() => {
//     observer.next(1);
//   }, 1000);
//   observer.next(2);
//   observer.complete(3);
// });
//
// const subject = {
//   next: value => {
//     console.log(value);
//   },
//   complete: console.log,
//   error: console.log
// };
// // console.log(subject.complete(2))
// let unsubscribe = observerable(subject);


const getName = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("nodejs");
  }, 500);
});

const getError = Promise.reject("出错啦~");

getError.catch(console.log);

Promise.all([getName, getName])
  .then(console.log)
  .catch(console.log);

Promise.race([getName, getName])
  .then(console.log)
  .catch(console.log);

getName
  .then(name => {
    console.log(name);
    return 20;
  })
  .then(number => {
    console.log(number);
  });
