import Page404 from '@/views/Page404.vue'
import Login from "@/views/Login.vue";

//	同步路由
export const syncRoutesList: Array<any> = [
	{
		meta: {
			hidden: true,
		},
		path: '/404',
		name: '404',
		component: Page404,
	},
	{
		meta: {
			hidden: true,
			chName: '登录',
		},
		path: '/login',
		name: 'login',
		component: Login,
	},
];


//	路由未找到
export const NotFoundRoutes = {
	meta: {
		hidden: true,
	},
	path: '*',
	redirect: '/404',
};

// syncRoutesList.push(NotFoundRoutes);
//	同步路由的长度
export const syncRoutesListLength = syncRoutesList.length;