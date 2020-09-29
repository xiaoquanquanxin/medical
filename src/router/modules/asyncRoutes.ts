import LayoutStair from '@/layout/layoutStair/layoutStair.vue';

//	异步路由
export const asyncRoutesList = [
	{
		meta: {
			chName: '医院管理',
			selectRouteKey: 'hospital',
		},
		path: '/hospital',
		name: 'hospital',
		component: () => import(/* webpackChunkName: "hospital" */ '@/views/hospital/hospital.vue'),
	},
	{
		meta: {
			chName: '新增医院',
			selectRouteKey: 'hospital',
		},
		path: '/hospital/addHospital',
		name: 'addHospital',
		component: () => import(/* webpackChunkName: "addHospital" */ '@/views/hospital/addHospital.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '科室管理',
			selectRouteKey: 'administrativeOffice',
		},
		path: '/administrativeOffice',
		name: 'administrativeOffice',
		component: () => import(/* webpackChunkName: "administrativeOffice" */ '@/views/administrativeOffice/administrativeOffice.vue'),
	},
	{
		meta: {
			chName: '新增科室',
			selectRouteKey: 'administrativeOffice',
		},
		path: '/administrativeOffice/newDepartment',
		name: 'newDepartment',
		component: () => import(/* webpackChunkName: "newDepartment" */ '@/views/administrativeOffice/newDepartment.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '医生管理',
			selectRouteKey: 'doctor',
		},
		path: '/doctor',
		name: 'doctor',
		component: () => import(/* webpackChunkName: "doctor" */ '@/views/doctor/doctor.vue'),
	},
	{
		meta: {
			chName: '新增医生',
			selectRouteKey: 'doctor',
		},
		path: '/doctor/newDoctor',
		name: 'newDoctor',
		component: () => import(/* webpackChunkName: "newDoctor" */ '@/views/doctor/newDoctor.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '用户管理',
			selectRouteKey: 'user',
		},
		path: '/user',
		name: 'user',
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/user.vue'),
	},
	{
		meta: {
			chName: '新增用户',
			selectRouteKey: 'user',
		},
		path: '/user/newUser',
		name: 'newUser',
		component: () => import(/* webpackChunkName: "newUser" */ '@/views/user/newUser.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '编辑用户',
			selectRouteKey: 'user',
		},
		path: '/user/editUser/:id',
		name: 'editUser',
		component: () => import(/* webpackChunkName: "newUser" */ '@/views/user/newUser.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '家庭组',
			selectRouteKey: 'familyGroup',
		},
		path: '/familyGroup',
		name: 'familyGroup',
		component: () => import(/* webpackChunkName: "familyGroup" */ '@/views/familyGroup/familyGroup.vue'),
	},
	{
		meta: {
			chName: '新增家庭组',
			selectRouteKey: 'familyGroup',
		},
		path: '/familyGroup/newFamilyGroup',
		name: 'newFamilyGroup',
		component: () => import(/* webpackChunkName: "newFamilyGroup" */ '@/views/familyGroup/newFamilyGroup.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '公司信息',
			selectRouteKey: 'companyInfo',
		},
		path: '/companyInfo',
		name: 'companyInfo',
		component: () => import(/* webpackChunkName: "companyInfo" */ '@/views/companyInfo/companyInfo.vue'),
	},
	{
		meta: {
			chName: '商品管理',
			selectRouteKey: 'commodity',
		},
		path: '/commodity',
		name: 'commodity',
		component: () => import(/* webpackChunkName: "commodity" */ '@/views/commodity/commodity.vue'),
	},
	{
		meta: {
			chName: '添加商品',
			selectRouteKey: 'commodity',
		},
		path: '/commodity/addCommodity',
		name: 'addCommodity',
		component: () => import(/* webpackChunkName: "addCommodity" */ '@/views/commodity/addCommodity.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '统计管理',
			selectRouteKey: 'statistical',
		},
		path: '/statistical',
		name: 'statistical',
		component: () => import(/* webpackChunkName: "statistical" */ '@/views/statistical/statistical.vue'),
	},
	{
		meta: {
			chName: '方案管理',
			selectRouteKey: 'scheme',
		},
		path: '/scheme',
		name: 'scheme',
		component: () => import(/* webpackChunkName: "scheme" */ '@/views/scheme/scheme.vue'),
	},
	{
		meta: {
			chName: '宣教管理',
			selectRouteKey: 'mission',
		},
		path: '/mission',
		name: 'mission',
		component: () => import(/* webpackChunkName: "mission" */ '@/views/mission/mission.vue'),
	},
	{
		meta: {
			chName: '系统设置',
			selectRouteKey: 'system',
		},
		path: '/system',
		name: 'system',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '修改密码',
					selectRouteKey: 'changePassword',
					openRouteKey: 'system',
				},
				name: 'changePassword',
				path: '/system/changePassword',
				component: () => import(/* webpackChunkName: "changePassword" */ '@/views/system/changePassword.vue'),
			},
			{
				meta: {
					chName: '角色管理',
					selectRouteKey: 'role',
					openRouteKey: 'system',
				},
				name: 'role',
				path: '/system/role',
				component: () => import(/* webpackChunkName: "role" */ '@/views/system/role.vue'),
			},
			{
				meta: {
					chName: '账号管理',
					selectRouteKey: 'account',
					openRouteKey: 'system',
				},
				name: 'account',
				path: '/system/account',
				component: () => import(/* webpackChunkName: "account" */ '@/views/system/account.vue'),
			},
		]
	},
]