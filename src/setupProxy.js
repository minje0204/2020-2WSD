const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://3.35.218.80:3001/',
            changeOrigin: true
        })
    )
};