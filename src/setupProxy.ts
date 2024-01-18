import { createProxyMiddleware } from 'http-proxy-middleware';
import * as express from "express";

const app = express.default();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
  }),
);

app.listen(3000);