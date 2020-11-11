安装依赖npm install
本地运行npm run serve
线上包npm run build

css颜色、布局、一些元素大小等有自己的[css](/src/css)
要修改某些地方的css，用class区分组件，因为直接修改会影响组件全局样式
造成修改ui的原因是项目没有【设计图】这个概念，所以用了antd。⚠️所以不建议改ui，因为是在和antd做对。

路由
开发者权限把[routeList](/src/store/modules/routeList.ts)第59行放开
由于一开始没有菜单管理这个概念，所以[路由控制](/src/router/modules/asyncRoutes.ts)是前端控制的，现已改为服务端控制，但服务端只保留路由的name，这样做的好处是服务端改动小，维护方便，录入菜单方便，且服务端现在返回按钮权限有bug、vue有一版直接返回路由对象json解析有bug。
[路由权限name](/src/router/routeMap.ts)

[代理](/vue.config.js)


数据返回有可能是问题的
服务端设置字段也有冲突，比如sex=1？2？0？

