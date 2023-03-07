const express = require("express");
const morgan = require("morgan"); // 아래 dev 추가
const app = express();
const PORT = 8080;

app.use(express.json());

const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const { pool } = require("./db");

// get get post patch delete

app.post("test/:id", async (req, res) => {
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
  try { 
    const data = await pool.query("SELECT * FROM menus");
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "전체 메뉴 목록 조회에 실패하였습니다."
    });
  }
});

app.get("/api/menus/:id", async (req, res) => {
  try {
    const data = await pool.query(
      `
      SELECT * FROM menus
      WHERE id=${req.params.id}
      `
    );
    if (!data[0].length) {
      return res.json({
        success: false,
        message: "조회에 실패하였습니다."
      });
    } 
    if (data[0][0]) {
      return res.json(data[0][0]);
    }
  } catch(error) {
    return res.json({
      success: false,
      message: "없는 주문으로 주문에 실패했습니다."
    });
  }
});

app.post("/api/menus", async(req, res) => {
  try {
    const data = await pool.query(
      `
        INSERT INTO menus
        (name, description, image_src)
        VALUES
        ("${req.body.name}", "${req.body.description}", "${req.body.image_src}")
      `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "DB 업로드에 실패하였습니다."
    });
  }
});

app.patch("/api/menus/:id", async(req, res) => {
  try {
    const data = await pool.query(
      `
        UPDATE menus
        SET name="${req.body.name}", description="${req.body.description}", image_src="${req.body.image_src}"
        WHERE id=${req.params.id}
      `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "메뉴 수정에 실패하였습니다."
    });
  }
});

app.delete("/api/menus/:id", async(req, res) => {
  try {
    const data = await pool.query(
      `
        DELETE FROM menus WHERE id=${req.params.id}
        `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "메뉴 삭제에 실패하였습니다."
    });
  }
});

app.get("/api/orders", async (req, res) => {
  try { 
    const data = await pool.query(`
    SELECT a.id, quantity, request_detail, name, description
    FROM orders as a
    INNER JOIN menus as b
    ON a.menus_id = b.id
    ORDER BY a.id DESC
    `);
    return res.json(data[0]);
  } catch (error) {
    return res.json({
      success: false,
      message: "전체 주문 목록 조회에 실패하였습니다."
    });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const data = await pool.query(
      `
      SELECT a.id, name, quantity, request_detail
      FROM orders as a
      INNER JOIN menus as b
      ON a.menus_id = b.id
      WHERE b.id=${req.params.id} 
      `
    );
    if (data[0][0]) {
      return res.json(data[0][0]);
    };
  } catch(error) {
    return res.json({
      success: false,
      message: "주문 내역 조회에 실패하였습니다."
    });
  }
});

app.post("/api/orders", async(req, res) => {
  try {
    const data = await pool.query(
      `
        INSERT INTO orders
        (quantity, request_detail, menus_id)
        VALUES
        ("${req.body.quantity}", "${req.body.request_detail}", "${req.body.menus_id}")
      `
    );
    if (data[0]) {
      return res.json(data[0]);
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "DB 업로드에 실패하였습니다."
    });
  }
});

app.patch("/api/orders/:id", async(req, res) => {
  try {
    const data = await pool.query(
      `
        UPDATE orders
        SET menus_id="${req.body.menus_id}", quantity="${req.body.quantity}", request_detail="${req.body.request_detail}"
        WHERE id=${req.params.id}
      `
    );
    if (data[0]) {
      return res.json({
        success: true,
        message: "주문 수정에 성공하셨습니다."
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "주문 수정에 실패하였습니다."
    });
  }
});

app.delete("/api/orders/:id", async(req, res) => {
  try {
    const data = await pool.query(
      `
        DELETE FROM orders WHERE id=${req.params.id}
      `
    );
    if (data[0]) {
      return res.json({
        success: true,
        message: "주문 삭제에 성공하셨습니다."
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "주문 삭제에 실패하였습니다."
    });
  }
});

app.listen(PORT, () => console.log(`this server is listening on ${PORT}`));
