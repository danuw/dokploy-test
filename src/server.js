const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/", (_req, res) => {
  res.json({
    app: "dokploy-sample-app",
    status: "ok",
    message: "Hello from Dokploy sample app"
  });
});

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
