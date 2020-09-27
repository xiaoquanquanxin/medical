import {asyncRoutesMap} from "@/router/modules/asyncRoutes"


//  把服务端的路由，根据 routerId 字段，转为前端路由，这里需要一个 map：routerBasicMap 作比对
export function convertRouting(data: any) {
	if (!data || !data.length) {
		return [];
	}
	return data.map((item: any, index: number): any => {
		const {id} = item;
		const data: any = {};
		const children = convertRouting(item.childrenList);
		data.children = children;
		// @ts-ignore
		return Object.assign(data, asyncRoutesMap[id]);
	})
}

/**
 * @routes:{haveChildren:boolean}
 * */
function convertRoutingItem() {

}
