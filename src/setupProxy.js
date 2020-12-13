const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://3.36.26.191:3001/',
            changeOrigin: true
        })
    )
};