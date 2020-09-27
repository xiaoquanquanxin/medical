import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		//	首页
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		//	登陆
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

import store from '../store';
import Login from "@/views/Login.vue"
// import NProgress from 'nprogress'; // progress bar
// NProgress.configure({showSpinner: false}); // NProgress Configuration
router.beforeEach(async (to, from, next) => {
	//  去哪儿
	if (from.path !== to.path) {

		// NProgress.done();
		// return;
	}
	console.log(from.path, to.path);
	await store.dispatch('sidebar/setSelectRouteKey', to.path);

	next();
})
export default router
