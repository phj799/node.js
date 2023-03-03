const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

const { pool } = require("./db"); // db/index.js에서 pool 받아옴~

app.post("/test/:menu_id", async (req, res) => {
  try{
    console.log(req.params);
    console.log(req.body);
    console.log(req.query);
    return res.json({});
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/menus", async (req, res) => {
  try { // 포트가 다르면 다른 프로그램으로 여김. 밖으로 내보내기때문에 딜레이발생. async, await 필수
    const data = await pool.query("SELECT * FROM menus");
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/menus/:id", async (req, res) => { // :id를 URL params라고 함
  try {
    const data = await pool.query( 
    // 데이터가 하나의 배열이 아닌 리스트안에 담기기 때문에
    // [0][0]으로 접근해야함
      `
        SELECT * FROM menus 
        WHERE menu_id=${req.params.id}
      `
    );
    if (data[0][0]) {
      return res.json(data[0][0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/menus", async (req, res) => {
  try {
    const data = await pool.query(
      `
        INSERT INTO menus 
        (menu_name, menu_description, menu_img_link) 
        VALUES 
        ("${req.body.menu_name}", "${req.body.menu_description}", "${req.body.menu_img_link}")
      `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/menus/:id", async (req, res) => {
  try {
    const data = await pool.query(
      `
        UPDATE menus 
        SET menu_name="${req.body.menu_name}", menu_description="${req.body.menu_description}", menu_img_link="${req.body.menu_img_link}"
        WHERE menu_id=${req.params.id}
      `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/menus/:id", async (req, res) => {
  try {
    const data = await pool.query(
      `
        DELETE FROM menus WHERE menu_id=${req.params.id}
      `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`this server is listening on ${PORT}`));
