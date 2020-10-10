import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, message} from 'ant-design-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./css/reset.css";
import "./css/layout.css";

//	@ts-ignore
import Print from 'vue-print-nb';

//  第一种富文本的css
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import '@/css/quill.css';

Vue.use(Antd);
Vue.config.productionTip = false
Vue.use(Button);
Vue.prototype.$message = message;
Vue.use(Print);


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')



