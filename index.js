const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/request", async (req, res) => {
  const body = req.body;
  if (!body.type) {
    res.status(400).json({
      success: false,
      message: "type not available",
    });
    return;
  }
  if (!body.url) {
    res.status(400).json({
      success: false,
      message: "url not available",
    });
    return;
  }
  const isGetReq = body.type.toLowerCase() == "get" ? true : false;
  const headers = body.headers || {};
  const url = body.url;
  const mainBody = body.body || {};

  let response, data;
  const config = {
    headers,
  };
  try {
    if (isGetReq)
      response = await axios.get(url, config).catch((err) => void err);
    else
      response = await axios
        .post(url, mainBody, config)
        .catch((err) => void err);
    data = response.data;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error making req",
      error: err,
      errorString: err + "",
    });
    return;
  }

  res.status(200).json({ success: true, data });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is up at : ${process.env.PORT || 5000}`);
});
