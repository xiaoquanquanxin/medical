//	路由控制
import {
	NotFoundRoutes,
	syncRoutesList,
	syncRoutesListLength
} from "@/router/modules/syncRoutes"
import {getRoutes} from "@/api/basic"
import {RouteConfig} from "vue-router"
import {setRouteListByMap} from "@/utils/routerBasicMap"
import {asyncRoutesList} from "@/router/modules/asyncRoutes"
import {routeMap} from "@/router/routeMap"
import {COMMIT_INTERFACE} from "@/store"
import {convertRouting, getLoginInfo} from "@/utils/auth"
import {requestMenuAllTree, requestMenuUserMenu} from "@/api/system/menu"

interface STATE {
	routeListLength: number;
	routes: RouteConfig[];
	userRouteList: RouteConfig[];
	templateRouteList: RouteConfig[];
	currentMeta: any;
}

const state: STATE = {
	routes: syncRoutesList,
	//	路由的长度，默认为同步路由的长度
	routeListLength: syncRoutesListLength,
	userRouteList: [],
	templateRouteList: [],
	currentMeta: null,
};

const mutations = {
	SET_ROUTE_LENGTH: (state: STATE, routesList: RouteConfig[]) => {
		state.routes = syncRoutesList.concat(routesList);
		state.routeListLength = state.routes.length
	},
	SET_USER_ROUTE_LIST: (state: STATE, userRouteList: RouteConfig[]) => {
		state.userRouteList = userRouteList
	},
	SET_TEMPLATE_ROUTER_LIST: (state: STATE, templateRouteList: RouteConfig[]) => {
		state.templateRouteList = templateRouteList
	},

	SET_CURRENT_META: (state: STATE, currentMeta: any) => {
		state.currentMeta = currentMeta;
	}
};


const actions = {
	//  生成路由权限，从服务端动态拉取
	generateRoutes({commit}: COMMIT_INTERFACE<null>) {
		// return;
		let map = {};
		//	@ts-ignore
		const username = getLoginInfo().username;
		console.log('开发者在这里配置', username);
		// if (username === 'admin') {
		// 	const routesList = setRouteListByMap(routeMap, asyncRoutesList)
		// 	routesList.push(NotFoundRoutes);
		// 	commit('SET_ROUTE_LENGTH', routesList);
		// 	return routesList;
		// }
		//	服务端数据
		// return requestMenuAllTree()
		//	todo	难点！
		return requestMenuUserMenu()
			.then((list: any) => {
				//	转换路由
				const {routeMap, buttonMap} = convertRouting(list);
				//	console.log(routeMap);
				//	console.log(buttonMap);
				const routesList = setRouteListByMap(routeMap, asyncRoutesList)
				routesList.push(NotFoundRoutes);
				commit('SET_ROUTE_LENGTH', routesList);
				//	console.log(JSON.parse(JSON.stringify(routesList)));
				return routesList;
			});
		//	⚠️开发者
		const loginInfo = getLoginInfo();
		//	@ts-ignore
		loginInfo.type = -1;
		map = routeMap;
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(map);
			}, 0);
		})
			.then((list => {
				// const routesList = convertRouting(list);
				const routesList = setRouteListByMap(map, asyncRoutesList)
				routesList.push(NotFoundRoutes);
				commit('SET_ROUTE_LENGTH', routesList);
				return routesList;
			}));
		return getRoutes({})
			.then((accessedRoutes) => {
				//  todo    处理服务端路由，转为前端路由

				// commit('SET_ROUTES', routesList);
				return accessedRoutes;
			});
	},
	//	设置用户路由的子路由
	setUserRouteList({commit}: COMMIT_INTERFACE<null>, userRouteList: RouteConfig[]) {
		commit('SET_USER_ROUTE_LIST', userRouteList);
	},
	//	设置用户路由的子路由
	setTemplateRouteList({commit}: COMMIT_INTERFACE<null>, userRouteList: RouteConfig[]) {
		commit('SET_TEMPLATE_ROUTER_LIST', userRouteList);
	},

	//	设置当前激活路由的元信息
	setCurrentMeta({commit}: COMMIT_INTERFACE<null>, currentMeta: any) {
		commit('SET_CURRENT_META', currentMeta);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
