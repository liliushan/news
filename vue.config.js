const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('assets', resolve('./src/assets'))
            .set('commonjs', resolve('./src/commonjs'))
            .set('network', resolve('./src/network'))
            .set('views', resolve('./src/views'))
            .set('utils', resolve('./src/utils'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    publicPath: './'
}