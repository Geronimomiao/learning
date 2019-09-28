// const http = require('http');
// const server = http.createServer();
//
// server.listen(3000, () => {
//   process.title = 'wsm';
//   console.log('进程 id', process.pid);
// });

// 计算耗时造成 进程阻塞
const http = require('http');
const server = http.createServer();

const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }
  return sum;
};

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    console.log('计算开始', new Date());
    const sum = longComputation();
    console.log('计算结束', new Date());
    console.log(`sum is ${sum}`);
  }
});

server.listen(3000);




