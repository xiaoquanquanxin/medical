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
			chName: '编辑医院',
			selectRouteKey: 'hospital',
		},
		path: '/hospital/editHospital/:hospitalId',
		name: 'editHospital',
		component: () => import(/* webpackChunkName: "addHospital" */ '@/views/hospital/addHospital.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '科室管理',
			selectRouteKey: 'department',
		},
		path: '/department',
		name: 'department',
		component: () => import(/* webpackChunkName: "department" */ '@/views/department/department.vue'),
	},
	{
		meta: {
			chName: '新增科室',
			selectRouteKey: 'department',
		},
		path: '/department/addDepartment',
		name: 'addDepartment',
		component: () => import(/* webpackChunkName: "addDepartment" */ '@/views/department/addDepartment.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '编辑科室',
			selectRouteKey: 'department',
		},
		path: '/department/editDepartment/:departmentId',
		name: 'editDepartment',
		component: () => import(/* webpackChunkName: "addDepartment" */ '@/views/department/addDepartment.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '疾病管理',
			selectRouteKey: 'disease',
		},
		path: '/disease',
		name: 'disease',
		component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/disease.vue'),
	},
	{
		meta: {
			chName: '新增疾病',
			selectRouteKey: 'disease',
		},
		path: '/disease/addDisease',
		name: 'addDisease',
		component: () => import(/* webpackChunkName: "addDisease" */ '@/views/disease/addDisease.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '编辑疾病',
			selectRouteKey: 'disease',
		},
		path: '/disease/editDisease/:diseaseId',
		name: 'editDisease',
		component: () => import(/* webpackChunkName: "addDisease" */ '@/views/disease/addDisease.vue'),
		hidden: true
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
		path: '/doctor/addDoctor',
		name: 'addDoctor',
		component: () => import(/* webpackChunkName: "addDoctor" */ '@/views/doctor/addDoctor.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '编辑医生',
			selectRouteKey: 'doctor',
		},
		path: '/doctor/editDoctor/:doctorId',
		name: 'editDoctor',
		component: () => import(/* webpackChunkName: "addDoctor" */ '@/views/doctor/addDoctor.vue'),
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
	//	⚠️原型图没有
	// {
	// 	meta: {
	// 		chName: '新增用户',
	// 		selectRouteKey: 'user',
	// 	},
	// 	path: '/user/newUser',
	// 	name: 'newUser',
	// 	component: () => import(/* webpackChunkName: "newUser" */ '@/views/user/newUser.vue'),
	// 	hidden: true,
	// },
	{
		meta: {
			chName: '编辑用户',
			selectRouteKey: 'user',
		},
		path: '/user/editUser/:userId',
		name: 'editUser',
		component: () => import(/* webpackChunkName: "newUser" */ '@/views/user/newUser.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '家庭组',
			selectRouteKey: 'user',
		},
		path: '/user/familyGroup',
		name: 'familyGroup',
		component: () => import(/* webpackChunkName: "familyGroup" */ '@/views/familyGroup/familyGroup.vue'),
		hidden: true,
	},
	//	⚠️原型图没有
	// {
	// 	meta: {
	// 		chName: '新增家庭组',
	// 		selectRouteKey: 'user',
	// 	},
	// 	path: '/familyGroup/newFamilyGroup',
	// 	name: 'newFamilyGroup',
	// 	component: () => import(/* webpackChunkName: "newFamilyGroup" */ '@/views/familyGroup/newFamilyGroup.vue'),
	// 	hidden: true,
	// },
	//	⚠️原型图没有
	// {
	// 	meta: {
	// 		chName: '公司信息',
	// 		selectRouteKey: 'companyInfo',
	// 	},
	// 	path: '/companyInfo',
	// 	name: 'companyInfo',
	// 	component: () => import(/* webpackChunkName: "companyInfo" */ '@/views/companyInfo/companyInfo.vue'),
	// },
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