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
      target: 'http://3717-34-147-59-30.ngrok-free.app',
      changeOrigin: true,
    }),
    createProxyMiddleware('/img', { //vision server
      target: 'http://5b7a-172-83-13-4.ngrok-free.app',
      changeOrigin: true,
    }),

  );
};