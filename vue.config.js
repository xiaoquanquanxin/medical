module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://49.232.14.93:8080/',
                ws: true,
                changeOrigin: true,
            },
//            '/supplier': {
//                target: 'http://49.232.14.93:8080/',
//                ws: true,
//                changeOrigin: true,
//                pathRewrite: {
////                    '^/api': '',
//                },
//            },
        }
    }
};