// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const db = require('./config/db'); // db 연결 모듈 가져오기

const userRoutes = require('./users/userRoutes');
const auth = require('./auth/authRoutes');
const kakaoRoutes = require('./social/kakao/kakaoRoutes');
const googleRoutes = require('./social/google/googleRoutes');
const loc = require('./location/locationRoutes');
const productRoutes = require('./products/productRoutes');

const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'ghkd5370',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}));

app.use('/api', userRoutes);
app.use('/loc', loc);
app.use('/auth', auth);
app.use('/social/kakao', kakaoRoutes);
app.use('/social/google', googleRoutes);
app.use('/products', productRoutes)

// startServer 함수를 새로 정의하고, 데이터베이스 초기화와 서버 시작 로직을 포함합니다.
async function startServer() {
  try {
    console.log('Initializing database connection pool...'); // DB 초기화 시작 로그
    await db.initialize(); // db.js에서 내보낸 initialize 함수를 호출하고 완료될 때까지 기다립니다.
    console.log('Database connection pool initialized. Starting server...'); // DB 초기화 성공 후 서버 시작 로그

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (err) {
    // 데이터베이스 초기화 또는 서버 시작 중 치명적인 오류가 발생하면 여기에 잡힙니다.
    console.error('Failed to start server due to a critical error during database initialization or server startup:', err);
    process.exit(1); // 오류 발생 시 애플리케이션 종료
  }
}

// startServer 함수를 호출하여 애플리케이션을 시작합니다.
startServer();

// 애플리케이션 종료 시 DB 연결 풀을 안전하게 닫기 위한 이벤트 리스너
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing Oracle connection pool');
  await db.closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing Oracle connection pool');
  await db.closePool();
  process.exit(0);
});