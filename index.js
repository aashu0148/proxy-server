const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(422).json({
      message: "No url found.",
    });
    return;
  }
  const response = await axios.get(url).catch((err) => {
    res.status(500).json({
      message: "Error requesting url",
      error: err,
    });
    return;
  });

  res.status(200).json({
    data: response.data,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is up at : ${process.env.PORT || 5000}`);
});
