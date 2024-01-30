const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    }),
    createProxyMiddleware('/chat', {
      target: 'http://5f39-34-29-22-124.ngrok-free.app',
      changeOrigin: true,
    }),
    // createProxyMiddleware('/', {
    //   target: 'http://ec2-13-53-197-151.eu-north-1.compute.amazonaws.com:5000/',
    //   changeOrigin: true,
    // }),
    createProxyMiddleware('/dashboard', {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    }),

  );
};