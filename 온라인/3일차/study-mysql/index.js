const express = require("express");
const app = express();
const PORT = 8080;

const cors = require('cors');
// const pool = require("./db");
const { pool } = require('./db');

// app.use 전역(모든 요청마다 적용)
app.use(cors());

// body에 데이털르 받아오기 위해서는 셋팅이 하나 꼭 필요하다
// json형식의 데이터를 받아오기 위해 필요한 셋팅 -> 이게 빠지면 body 데이터 받아오기 x
app.use(express.json());


// app.get("/api/menus", async (req, res) => {
//   try {
//     const data = await pool.query("SELECT * FROM menus");
//     if (data[0]) {
//       return res.json(data[0]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// jony 스키마의 menus 테이블의 정보를 가져와서
// GET /api/menus
// DB연결 -> async/await DB 행동이 비동기 

app.get("/api/menus", async (req, res) => {
  try {
    // select * from menus;
    const data = await pool.query("SELECT * FROM menus");
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

// POST /api/menus ?? 이떄는 클라이언트를 만들어야한다.
app.post("/api/menus", async (req, res) => {
  console.log(req.body);
  // body 안에 menu_name, menu_description을 DB에 쿼리로 날리면 끝
  try{
    // 첫번째 방식
    const data = await pool.query(`INSERT INTO menus (menu_name, menu_description, menu_img_link)
    VALUES (?, ?, ?)`, [req.body.menu_name, req.body.menu_description, "none"]);
    return res.json(data[0]);
    // 두번째 방식
  } catch (error) {
    console.log(error);
      return res.json(error);
  }
    
});

app.listen(PORT, () => console.log(`this server is listening on ${PORT}`));
