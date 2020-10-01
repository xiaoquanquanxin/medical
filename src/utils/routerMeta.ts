//	跳转
import {RouteConfig} from "vue-router"

export function jumpTo(item: RouteConfig) {
	//	console.log(item.path);
	//	一种特殊情况，对于有页面内的横向子路由的，页面处于子路由，点击了父级路由
	//	@ts-ignore
	if ((this.$route.meta.selectRouteKey === item.meta.selectRouteKey) && item.meta.hasTransverseSubPaths) {
		return;
	}

	//  自己不跳转自己
	//	@ts-ignore
	if (this.$route.path === item.path) {
		return;
	}
	//	@ts-ignore
	this.$router.push({path: item.path});
}
