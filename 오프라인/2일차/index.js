const express = require("express");
const app = express();
const PORT = 8080;

// CORS(Cross-Origin Resource Sharing)문제를 해결하기 위해 아래 두줄 추가~
const cors = require("cors");
app.use(cors()); // global로 쓸 때
/* 
  특정 URL만 허용하고 싶다면 options를 추가해줍니당.
  const  corsOptions = {
    origin: "https://localhost:3000",
    credentials: true
  }
  app.use(cors(corsOptions));
  }));

  함수 형태도 가능합니당.

  const domains = ['http://localhost:3000'];
  const corsOptions = {
    origin: function(origin, callback) {
      const is True = domains.indexOf(origin) !== -1;
      callback(null, isTrue);
    },
    credentials: true
  }
  app.use(cors(corsOptions));
*/

app.get("/api/info", (req, res) => {
  return res.json({
    name : "박현종",
    job : "왜요?"
  })
})

app.get("/api/info2", (req, res) => {
  return res.json({
    name : "박현종",
    age : "26",
    comment : "집집집보내줘",
  })
})

app.listen(PORT, () => console.log(`this server is lisening on ${PORT}`));