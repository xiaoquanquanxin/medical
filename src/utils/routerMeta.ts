//	跳转
import {RouteConfig} from "vue-router"

export function jumpTo(item: RouteConfig) {
	console.log(item.path);
	//  自己不跳转自己
	//	@ts-ignore
	if (this.$route.path === item.path) {
		return;
	}
	//	@ts-ignore
	this.$router.push({path: item.path});
}
