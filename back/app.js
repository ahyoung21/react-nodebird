// node 자체가 서버가 아니라 node에서 제공하는 http가 서버
// const http = require('http');
const express = require('express');
const postRouter = require('./routes/post');

const app = express();

// app.get 가져오다
// app.post 생성하다
// app.put 전체수정
// app.delete 제거
// app.patch 부분수정
// app.options 찔러보기 (서버야 나 요청 보낼건데 요청 받아줄래?)
// app.head 헤더만 가져오기 (헤더/바디)

// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);
//   res.end('Hello node');
// });

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/posts', (req, res) => {
  res.json([
    {
      id: 1,
      nickname: 'ahyoung',
    },
    {
      id: 2,
      nickname: 'ahyoung2',
    },
    {
      id: 3,
      nickname: 'ahyoung3',
    },
  ]);
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
