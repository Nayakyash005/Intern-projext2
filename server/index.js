import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

import bodyParser from "body-parser";
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Proxy endpoint for /send-otp
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

app.use(
  "/send-otp",
  createProxyMiddleware({
    target: "http://185.192.96.202:9080",
    changeOrigin: true,
    pathRewrite: {
      "^/send-otp": "/send-otp", // rewrite path
    },
  })
);

// Proxy endpoint for /verify-otp
app.use(
  "/verify-otp",
  createProxyMiddleware({
    target: "http://185.192.96.202:9080",
    changeOrigin: true,
    pathRewrite: {
      "^/verify-otp": "/verify-otp", // rewrite path
    },
  })
);

app.listen(5000, () => {
  console.log("Proxy server is running on http://localhost:5000");
});
