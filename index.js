const express = require("express");
const cors = require("cors");
const axios = require("axios");
// const httpProxy = require("http-proxy");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const options = {
//   "myntra.com": "https://myntra.com",
// };

// const proxy = httpProxy.createProxy();

// const server = require("http").createServer(function (req, res) {
//   proxy.web(req, res, {
//     target: options[req.headers.host],
//   });
// });

// app.get("/myntra", async (req, res) => {
//   const response = await axios.get("https://myntra.com");
//   const text = response.data;

//   res.status(200).json({
//     text,
//   });
// });

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(422).json({
      message: "Url needed",
    });
    return;
  }
  const response = await axios.get(url);
  const text = response.data;

  res.status(200).json({
    text,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is up at : ${process.env.PORT || 5000}`);
});
