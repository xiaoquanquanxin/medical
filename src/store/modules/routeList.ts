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
import {routeMap} from '@/store/a.ts';
import {COMMIT_INTERFACE} from "@/store"
import {getLoginInfo} from "@/utils/auth"
import {
	roleType1,
	roleType2,
	roleType3,
	roleType4,
	roleType5,
	roleType6,
	roleType7,
	roleType8,
} from "@/utils/roleConstant"

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
		//	服务端数据
		// const map = routeMap;
		let map = {};
		const loginInfo = getLoginInfo();
		//	@ts-ignore
		// loginInfo.type = -1;
		//	@ts-ignore
		switch (loginInfo.type) {
			case -1:
				//	开发级路由
				// map = routeMap;
				break;
			case 1:
				map = roleType1;
				break;
			case 2:
				map = roleType2;
				break;
			case 3:
			case 8:
				map = roleType3;
				break;
			case 4:
				map = roleType4;
				break;
			case 5:
				map = roleType5;
				break;
			case 6:
				map = roleType6;
				break;
			case 7:
				map = roleType7;
				break;
			default:
				throw new Error('错误的类型');
		}
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
