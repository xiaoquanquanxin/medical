//  把服务端的路由，根据 routerId 字段，转为前端路由，这里需要一个 map：routerBasicMap 作比对
// export function convertRouting(data: any): RouteConfig[] {
// 	if (!data || !data.length) {
// 		return [];
// 	}
// 	return data.map((item: any, index: number): any => {
// 		const {id} = item;
// 		const children = convertRouting(item.children);
// 		console.log(asyncRoutesMap[id]);
// 		// @ts-ignore
// 		return Object.assign({}, asyncRoutesMap[id], children && children.length && {children});
// 	})
// }

import {RouteConfig} from "vue-router"

/**
 * @routes:{haveChildren:boolean}
 * */
// function convertRoutingItem() {
//
// }

//	根据数据觉定返回那些路由被展示
export function setRouteListByMap(map: any, asyncRoutesList: any): RouteConfig[] {
	let list: any[]
	list = []
	asyncRoutesList.forEach((item: any) => {
		//	如果服务端返回的数据有这个路由
		if (map[item.name]) {
			//	如果有子路由
			if (item.children) {
				const children = setRouteListByMap(map, item.children);
				item.children = children;
			}
			list.push(item)
		}
	});
	return list;
}