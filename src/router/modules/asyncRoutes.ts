import LayoutStair from '@/layout/layoutStair/layoutStair.vue';
import Scheme from '@/views/scheme/scheme.vue';
//	异步路由
export const asyncRoutesList = [

	/**
	 * 🍉🍉🍉🍉
	 * 平台部分
	 * */
	{
		meta: {
			chName: '渠道商管理',
			selectRouteKey: 'distributors',
			openRouteKey: 'platform',
		},
		name: 'distributors',
		path: '/distributors',
		component: () => import(/* webpackChunkName: "changePassword" */ '@/views/distributors/distributors.vue'),
	},
	{
		meta: {
			chName: '供应商管理',
			selectRouteKey: 'supplier',
			openRouteKey: 'platform',
		},
		name: 'supplier',
		path: '/supplier',
		component: () => import(/* webpackChunkName: "changePassword" */ '@/views/supplier/supplier.vue'),
	},
	{
		meta: {
			chName: '新增供应商',
			selectRouteKey: 'addSupplier',
			openRouteKey: 'platform',
		},
		name: 'addSupplier',
		path: '/addSupplier',
		component: () => import(/* webpackChunkName: "changePassword" */ '@/views/supplier/addSupplier.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '用户管理',
			selectRouteKey: 'user',
		},
		path: '/user',
		name: 'user',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '普通用户',
					selectRouteKey: 'ordinaryUser',
					openRouteKey: 'user',
				},
				name: 'ordinaryUser',
				path: '/user/ordinaryUser',
				component: () => import(/* webpackChunkName: "user" */ '@/views/user/ordinaryUser.vue'),
			},
			{
				meta: {
					chName: '患者用户',
					selectRouteKey: 'patientsUser',
					openRouteKey: 'user',
				},
				name: 'patientsUser',
				path: '/user/patientsUser',
				component: () => import(/* webpackChunkName: "user" */ '@/views/user/patientsUser.vue'),
			}
		],
	},
	{
		meta: {
			chName: '商品管理',
			selectRouteKey: 'commodity',
		},
		path: '/commodity',
		name: 'commodity',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '商品列表',
					selectRouteKey: 'commodityList',
					openRouteKey: 'commodity',
				},
				name: 'commodityList',
				path: '/commodity/commodityList',
				component: () => import(/* webpackChunkName: "user" */ '@/views/commodity/commodityList.vue'),
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
					chName: '编辑商品',
					selectRouteKey: 'commodity',
				},
				path: '/commodity/editCommodity/:commodityId',
				name: 'editCommodity',
				component: () => import(/* webpackChunkName: "addCommodity" */ '@/views/commodity/addCommodity.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '分类管理',
					selectRouteKey: 'commodityClassification',
					openRouteKey: 'commodity',
				},
				name: 'commodityClassification',
				path: '/commodity/commodityClassification',
				component: () => import(/* webpackChunkName: "user" */ '@/views/commodity/commodityClassification.vue'),
			},
			{
				meta: {
					chName: '品牌管理',
					selectRouteKey: 'brand',
					openRouteKey: 'commodity',
				},
				name: 'brand',
				path: '/commodity/brand',
				component: () => import(/* webpackChunkName: "user" */ '@/views/commodity/brand.vue'),
			},
			{
				meta: {
					chName: '生产厂家管理',
					selectRouteKey: 'manufacturer',
					openRouteKey: 'commodity',
				},
				name: 'manufacturer',
				path: '/commodity/manufacturer',
				component: () => import(/* webpackChunkName: "user" */ '@/views/commodity/manufacturer.vue'),
			}
		]
	},
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
			chName: '处方审核管理',
			selectRouteKey: 'scheme',
			//	有页面内的横向子路由
			hasTransverseSubPaths: true,
			//	虽然有子项，但作为一个项存在，而不是一个菜单
			isMenuItem: true,
		},
		name: 'scheme',
		path: '/scheme',
		component: Scheme,
		children: [
			{
				meta: {
					//	oral:口服
					chName: '口服肠内营养补充',
					selectRouteKey: 'scheme',
					//	是scheme路由的某一项子路由
					transverseSubPaths: 'oral',
				},
				name: 'oral',
				path: '/scheme/oral',
				component: () => import(/* webpackChunkName: "oral" */ '@/views/scheme/oral.vue'),
				hidden: true
			},
			{
				meta: {
					//	intestinal:肠内
					chName: '肠内营养支持',
					selectRouteKey: 'scheme',
					//	是scheme路由的某一项子路由
					transverseSubPaths: 'intestinal',
				},
				name: 'intestinal',
				path: '/scheme/intestinal',
				component: () => import(/* webpackChunkName: "intestinal" */ '@/views/scheme/intestinal.vue'),
				hidden: true
			},
			{
				meta: {
					//	dietary:膳食
					chName: '膳食营养计划',
					selectRouteKey: 'scheme',
					//	是scheme路由的某一项子路由
					transverseSubPaths: 'dietary',
				},
				name: 'dietary',
				path: '/scheme/dietary',
				component: () => import(/* webpackChunkName: "dietary" */ '@/views/scheme/dietary.vue'),
				hidden: true
			}
		],
		redirect: '/scheme/oral',
	},
	{
		meta: {
			chName: '新增口服肠内补充方案',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/addOral',
		name: 'addOral',
		component: () => import(/* webpackChunkName: "addDisease" */ '@/views/scheme/addOral.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '编辑口服肠内补充方案',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/editOral/:oralId',
		name: 'editOral',
		component: () => import(/* webpackChunkName: "addDisease" */ '@/views/scheme/addOral.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '评估调查表管理',
			selectRouteKey: 'questionnaire',
		},
		path: '/questionnaire',
		name: 'questionnaire',
		component: () => import(/* webpackChunkName: "disease" */ '@/views/questionnaire/questionnaire.vue'),
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
			chName: '新增宣教',
			selectRouteKey: 'mission',
		},
		path: '/mission/addMission',
		name: 'addMission',
		component: () => import(/* webpackChunkName: "addMission" */ '@/views/mission/addMission.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '编辑宣教',
			selectRouteKey: 'mission',
		},
		path: '/mission/editMission/:missionId',
		name: 'editMission',
		component: () => import(/* webpackChunkName: "addMission" */ '@/views/mission/addMission.vue'),
		hidden: true,
	},

	{
		meta: {
			chName: '系统管理',
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
		]
	},


	/**
	 * 🍉🍉🍉🍉
	 * 供应商部分
	 * */

	{
		meta: {
			chName: '商品查看',
			selectRouteKey: 'viewGoods',
			openRouteKey: 'viewGoods',
		},
		name: 'viewGoods',
		path: '/viewGoods',
		component: () => import(/* webpackChunkName: "changePassword" */ '@/views/viewGoods/viewGoods.vue'),
	},

	/**
	 * 🍉🍉🍉🍉
	 * 渠道商部分
	 * */
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

	//	订单管理
	{
		meta: {
			chName: '订单管理',
			selectRouteKey: 'order',
		},
		path: '/order',
		name: 'order',
		component: () => import(/* webpackChunkName: "order" */ '@/views/order/order.vue'),
	},
	{
		meta: {
			chName: '订单管理',
			selectRouteKey: 'orderDetail',
		},
		path: '/orderDetail/:orderDetailId',
		name: 'orderDetail',
		component: () => import(/* webpackChunkName: "orderDetail" */ '@/views/order/orderDetail.vue'),
		hidden: true,
	},
	//	库房管理
	{
		meta: {
			chName: '库房管理',
			selectRouteKey: 'warehouse',
		},
		path: '/warehouse',
		name: 'warehouse',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '商品库存',
					selectRouteKey: 'inventory',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/inventory',
				name: 'inventory',
				component: () => import(/* webpackChunkName: "inventory" */ '@/views/warehouse/inventory.vue'),
			},
			{
				meta: {
					chName: '出库',
					selectRouteKey: 'outbound',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/outbound',
				name: 'outbound',
				component: () => import(/* webpackChunkName: "outbound" */ '@/views/warehouse/outbound.vue'),
			},
			{
				meta: {
					chName: '入库',
					selectRouteKey: 'putInStorage',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/putInStorage',
				name: 'putInStorage',
				component: () => import(/* webpackChunkName: "putInStorage" */ '@/views/warehouse/putInStorage.vue'),
			},
			{
				meta: {
					chName: '报损',
					selectRouteKey: 'reportedLoss',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/reportedLoss',
				name: 'reportedLoss',
				component: () => import(/* webpackChunkName: "reportedLoss" */ '@/views/warehouse/reportedLoss.vue'),
			}
		]
	},

	/**
	 * 🍉🍉🍉🍉
	 * 医院部分
	 * */
	{
		meta: {
			chName: '编辑用户',
			selectRouteKey: 'user',
		},
		path: '/user/editUser/:userId',
		name: 'editUser',
		component: () => import(/* webpackChunkName: "newUser" */ '@/views/user/editUser.vue'),
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

]



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



//	⚠️原型图没有了
// {
// 	meta: {
// 		chName: '角色管理',
// 		selectRouteKey: 'role',
// 		openRouteKey: 'system',
// 	},
// 	name: 'role',
// 	path: '/system/role',
// 	component: () => import(/* webpackChunkName: "role" */ '@/views/system/role.vue'),
// },
// {
// 	meta: {
// 		chName: '账号管理',
// 		selectRouteKey: 'account',
// 		openRouteKey: 'system',
// 	},
// 	name: 'account',
// 	path: '/system/account',
// 	component: () => import(/* webpackChunkName: "account" */ '@/views/system/account.vue'),
// },


// {
// 	meta: {
// 		chName: '统计管理',
// 		selectRouteKey: 'statistical',
// 	},
// 	path: '/statistical',
// 	name: 'statistical',
// 	component: () => import(/* webpackChunkName: "statistical" */ '@/views/statistical/statistical.vue'),
// },


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

