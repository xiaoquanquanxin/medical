import store from "@/store"
import {RouteConfig} from "vue-router"
import LayoutStair from '@/layout/layoutStair/layoutStair.vue';

//	根据数据觉定返回那些路由被展示
export function setRouteListByMap(map: any, asyncRoutesList: any): RouteConfig[] {
	let list: any[]
	list = [];
	asyncRoutesList.forEach((item: any) => {
		//	如果服务端返回的数据有这个路由
		if (map[item.name]) {
			if (item.component === LayoutStair) {
				if (!item.children || !item.children.length) {
					throw new Error('没有配置子路由');
				}
				//	console.log(item.children[0]);
				item.redirect = item.children[0].path;
				// item.redirect = item;
			}
			//	如果有子路由
			if (item.children) {
				const children = setRouteListByMap(map, item.children);
				item.children = children;
			}
			//	有页面内的横向子路由
			if (item.meta.hasTransverseSubPaths1) {
				//	如果没有子路由，直接抛出错误
				if (!item.children.length) {
					throw new Error('用户列表必须要有子路由，因为要指定重定向');
				}
				//	放在特殊的列表里
				store.dispatch('routeList/setTemplateRouteList', item.children);
			}
			if (item.meta.hasTransverseSubPaths2) {
				//	如果没有子路由，直接抛出错误
				if (!item.children.length) {
					throw new Error('用户列表必须要有子路由，因为要指定重定向');
				}
				//	放在特殊的列表里
				store.dispatch('routeList/setUserRouteList', item.children);
			}
			list.push(item);
		}
	});
	return list;
}