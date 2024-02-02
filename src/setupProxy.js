const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', { //user api server
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    }),
    createProxyMiddleware('/dashboard', { //dashboard server
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    }),
    createProxyMiddleware('/chat', { //chatbot server
      target: 'http://b03f-34-90-72-81.ngrok-free.app',
      changeOrigin: true,
    }),
    createProxyMiddleware('/img', { //vision server
      target: 'http://2209-34-125-15-144.ngrok-free.app',
      changeOrigin: true,
    }),

  );
};