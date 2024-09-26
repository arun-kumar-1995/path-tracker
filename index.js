import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

const { port = 8000 } = process.env.PORT;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
