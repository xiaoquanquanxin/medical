import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import store from '../store';
import {syncRoutesList, syncRoutesListLength} from "@/router/modules/syncRoutes"
import {getLoginInfo} from "@/utils/auth"

Vue.use(VueRouter);
const createRouter = (routesList: RouteConfig[]) => new VueRouter({
	mode: 'history',
	routes: routesList.concat(syncRoutesList)
});
//	白名单
const whiteList = ['/login'];
import getPageTitle from '@/utils/common';

const router = createRouter([]);
router.beforeEach(async (to, from, next) => {
	//	console.log('来自哪儿', from.path);
	//	console.log('去哪儿', to.path);
	window.document.title = getPageTitle(to.meta);
	const loginInfo = getLoginInfo();
	//	console.log(loginInfo);
	//	如果有权限
	if (loginInfo) {
		//	如果没更新路由
		if (store.state.routeList.routeListLength === syncRoutesListLength) {
			//	拿路由
			const accessRoutes = await store.dispatch('routeList/generateRoutes');
			const newRouter = createRouter(accessRoutes);
			// @ts-ignore
			// router.match = newRouter.match
			// @ts-ignore
			// router.matcher = newRouter.matcher;
			// @ts-ignore
			router.options.routes = newRouter.options.routes;
			//	console.log('拿到路由');
			await router.addRoutes(accessRoutes);
			const {name} = accessRoutes[0];
			//	如果刷新前没有路由
			if (to.fullPath === '/') {
				next({name, replace: true});
				return
			}
			next({...to, replace: true});
			return;
		}
		if (to.path === from.path) {
			return;
		}
		//	console.log('添加路由，元信息是');
		//	console.log(to.meta);
		await store.dispatch('routeList/setCurrentMeta', to.meta);
		//	console.log('设置被选中完成了');
		next();
	} else {
		const {path} = to;
		//	可以直接进入白名单
		if (whiteList.indexOf(path) !== -1) {
			next();
		} else {
			if (path === '/') {
				next({name: 'login'});
				return
			}
			next(`/login?redirect=${path}`);
		}
	}
})
export default router;
