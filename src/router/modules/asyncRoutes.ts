//	异步路由
export const asyncRoutesMap = {
	'UserManagement': {
		//	用户管理
		path: '/userManagement',
		name: 'UserManagement',
		chName: '用户管理',
		component: () => import(/* webpackChunkName: "userManagement" */ '../../views/userManagement/UserManagement.vue')
	},
	'UserManagementDetail': {
		//	用户管理详情
		path: '/userManagementDetail',
		name: 'UserManagementDetail',
		chName: '用户管理详情',
		component: () => import(/* webpackChunkName: "userManagementDetail" */ '../../views/userManagement/UserManagementDetail.vue')
	},
	'HospitalManagement': {
		//	医院管理
		path: '/hospitalManagement',
		name: 'HospitalManagement',
		chName: '医院管理',
		component: () => import(/* webpackChunkName: "userManagementDetail" */ '../../views/userManagement/UserManagementDetail.vue')
	}
}