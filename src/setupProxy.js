const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/settings', { //user api server
      target: 'https://lgsi-backend-vercel.vercel.app/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/dashboard', { //dashboard server
      target: 'https://lgsi-backend-vercel.vercel.app/',
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