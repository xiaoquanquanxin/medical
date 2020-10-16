import LayoutStair from '@/layout/layoutStair/layoutStair.vue';
import Scheme from '@/views/scheme/scheme.vue';
import UserList from '@/views/userList/userList.vue';
//	异步路由
/**
 * name					:	路由名称
 * path					:	路由地址
 * hidden				:	隐藏
 *
 * 🍌🍌meta中的:
 * chName				:	中文名
 * selectRouteKey		:	被选中的菜单的key，不区分一级二级，只要是蓝色的就是
 * openRouteKey			:	展开的菜单的key
 * hasTransverseSubPaths:	有页面内的横向子路由
 * isMenuItem			:	虽然有子项，但作为一个项存在，而不是一个菜单
 *
 * 🍌🍌children中的:
 * transverseSubPaths	:	横向子路由的name，不在左侧菜单展示。e.g.处方模板列表、用户列表【很多的那个】
 * routerParamsKey		:	路由参数的名称，用于骚操作，病人列表-横向路由区分用
 * **/
export const asyncRoutesList = [

	/**
	 * 🍉🍉🍉🍉
	 * 平台部分
	 * */
	{
		meta: {
			chName: '仓库管理',
			selectRouteKey: 'entrepot',
		},
		name: 'entrepot',
		path: '/entrepot',
		component: () => import(/* webpackChunkName: "entrepot" */ '@/views/entrepot/entrepot.vue'),
	},
	{
		meta: {
			chName: '渠道商管理',
			selectRouteKey: 'distributors',
		},
		name: 'distributors',
		path: '/distributors',
		component: () => import(/* webpackChunkName: "distributors" */ '@/views/distributors/distributors.vue'),
	},
	{
		meta: {
			chName: '供应商管理',
			selectRouteKey: 'supplier',
		},
		name: 'supplier',
		path: '/supplier',
		component: () => import(/* webpackChunkName: "supplier" */ '@/views/supplier/supplier.vue'),
	},
	{
		meta: {
			chName: '新增供应商',
			selectRouteKey: 'supplier',
		},
		name: 'addSupplier',
		path: '/addSupplier',
		component: () => import(/* webpackChunkName: "addSupplier" */ '@/views/supplier/addSupplier.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '编辑供应商',
			selectRouteKey: 'supplier',
		},
		name: 'editSupplier',
		path: '/editSupplier/:supplierId',
		component: () => import(/* webpackChunkName: "addSupplier" */ '@/views/supplier/addSupplier.vue'),
		hidden: true,
	},
	//	用户管理【平台用户】
	{
		meta: {
			chName: '用户管理',
			selectRouteKey: 'platformUser',
		},
		path: '/platformUser',
		name: 'platformUser',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '普通用户',
					selectRouteKey: 'ordinaryUser',
					openRouteKey: 'platformUser',
				},
				name: 'ordinaryUser',
				path: '/platformUser/ordinaryUser',
				component: () => import(/* webpackChunkName: "platformUser" */ '@/views/platformUser/ordinaryUser.vue'),
			},
			//	⚠️应该是按钮权限
			// {
			// 	meta: {
			// 		chName: '家庭组',
			// 		selectRouteKey: 'ordinaryUser',
			// 		openRouteKey: 'platformUser',
			// 	},
			// 	path: '/platformUser/familyGroup',
			// 	name: 'familyGroup',
			// 	component: () => import(/* webpackChunkName: "familyGroup" */ '@/views/familyGroup/familyGroup.vue'),
			// 	hidden: true,
			// },
			{
				meta: {
					chName: '患者用户',
					selectRouteKey: 'patientsUser',
					openRouteKey: 'platformUser',
				},
				name: 'patientsUser',
				path: '/platformUser/patientsUser',
				component: () => import(/* webpackChunkName: "platformUser" */ '@/views/platformUser/patientsUser.vue'),
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
				component: () => import(/* webpackChunkName: "platformUser" */ '@/views/commodity/commodityList.vue'),
			},
			{
				meta: {
					chName: '添加商品',
					selectRouteKey: 'commodityList',
					openRouteKey: 'commodity',
				},
				path: '/commodity/addCommodity',
				name: 'addCommodity',
				component: () => import(/* webpackChunkName: "addCommodity" */ '@/views/commodity/addCommodity.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '编辑商品',
					selectRouteKey: 'commodityList',
					openRouteKey: 'commodity',
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
				component: () => import(/* webpackChunkName: "platformUser" */ '@/views/commodity/commodityClassification.vue'),
			},
			{
				meta: {
					chName: '品牌管理',
					selectRouteKey: 'brand',
					openRouteKey: 'commodity',
				},
				name: 'brand',
				path: '/commodity/brand',
				component: () => import(/* webpackChunkName: "platformUser" */ '@/views/commodity/brand.vue'),
			},
			{
				meta: {
					chName: '生产厂家管理',
					selectRouteKey: 'manufacturer',
					openRouteKey: 'commodity',
				},
				name: 'manufacturer',
				path: '/commodity/manufacturer',
				component: () => import(/* webpackChunkName: "platformUser" */ '@/views/commodity/manufacturer.vue'),
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
					chName: '口服肠内营养补充',
					selectRouteKey: 'scheme',
					//	是scheme路由的某一项子路由
					transverseSubPaths: 'oral',
				},
				name: 'oral',
				path: '/scheme/oral',
				component: () => import(/* webpackChunkName: "oral" */ '@/views/scheme/oral/oral.vue'),
				hidden: true
			},
			{
				meta: {
					chName: '肠内营养支持',
					selectRouteKey: 'scheme',
					//	是scheme路由的某一项子路由
					transverseSubPaths: 'intestinal',
				},
				name: 'intestinal',
				path: '/scheme/intestinal',
				component: () => import(/* webpackChunkName: "intestinal" */ '@/views/scheme/intestinal/intestinal.vue'),
				hidden: true
			},
			{
				meta: {
					chName: '膳食营养计划',
					selectRouteKey: 'scheme',
					//	是scheme路由的某一项子路由
					transverseSubPaths: 'dietary',
				},
				name: 'dietary',
				path: '/scheme/dietary',
				component: () => import(/* webpackChunkName: "dietary" */ '@/views/scheme/dietary/dietary.vue'),
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
		component: () => import(/* webpackChunkName: "addOral" */ '@/views/scheme/oral/addOral.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '编辑口服肠内补充方案',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/editOral/:oralId',
		name: 'editOral',
		component: () => import(/* webpackChunkName: "addOral" */ '@/views/scheme/oral/addOral.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '新增肠内营养支持',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/addIntestinal',
		name: 'addIntestinal',
		component: () => import(/* webpackChunkName: "addIntestinal" */ '@/views/scheme/intestinal/addIntestinal.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '编辑肠内营养支持',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/editIntestinal/:intestinalId',
		name: 'editIntestinal',
		component: () => import(/* webpackChunkName: "addIntestinal" */ '@/views/scheme/intestinal/addIntestinal.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '新增膳食营养计划',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/addDietary',
		name: 'addDietary',
		component: () => import(/* webpackChunkName: "addDietary" */ '@/views/scheme/dietary/addDietary.vue'),
		hidden: true
	},
	{
		meta: {
			chName: '编辑膳食营养计划',
			selectRouteKey: 'scheme',
		},
		path: '/scheme/editDietary/:dietaryId',
		name: 'editDietary',
		component: () => import(/* webpackChunkName: "addDietary" */ '@/views/scheme/dietary/addDietary.vue'),
		hidden: true
	},


	{
		meta: {
			chName: '评估调查表管理',
			selectRouteKey: 'questionnaire',
		},
		path: '/questionnaire',
		name: 'questionnaire',
		component: () => import(/* webpackChunkName: "questionnaire" */ '@/views/questionnaire/questionnaire.vue'),
	},
	{
		meta: {
			chName: '新增评估调查表',
			selectRouteKey: 'questionnaire',
		},
		path: '/questionnaire/addQuestionnaire',
		name: 'addQuestionnaire',
		component: () => import(/* webpackChunkName: "addQuestionnaire" */ '@/views/questionnaire/addQuestionnaire.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '新增评估调查表',
			selectRouteKey: 'questionnaire',
		},
		path: '/questionnaire/editQuestionnaire/:questionnaireId',
		name: 'editQuestionnaire',
		component: () => import(/* webpackChunkName: "addQuestionnaire" */ '@/views/questionnaire/addQuestionnaire.vue'),
		hidden: true,
	},


	//	暂停⏸️
	//
	// {
	// 	meta: {
	// 		chName: '宣教管理',
	// 		selectRouteKey: 'mission',
	// 	},
	// 	path: '/mission',
	// 	name: 'mission',
	// 	component: () => import(/* webpackChunkName: "mission" */ '@/views/mission/mission.vue'),
	// },
	// {
	// 	meta: {
	// 		chName: '新增宣教',
	// 		selectRouteKey: 'mission',
	// 	},
	// 	path: '/mission/addMission',
	// 	name: 'addMission',
	// 	component: () => import(/* webpackChunkName: "addMission" */ '@/views/mission/addMission.vue'),
	// 	hidden: true,
	// },
	// {
	// 	meta: {
	// 		chName: '编辑宣教',
	// 		selectRouteKey: 'mission',
	// 	},
	// 	path: '/mission/editMission/:missionId',
	// 	name: 'editMission',
	// 	component: () => import(/* webpackChunkName: "addMission" */ '@/views/mission/addMission.vue'),
	// 	hidden: true,
	// },

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

	// {
	// 	meta: {
	// 		chName: '商品查看',
	// 		selectRouteKey: 'viewGoods',
	// 		openRouteKey: 'viewGoods',
	// 	},
	// 	name: 'viewGoods',
	// 	path: '/viewGoods',
	// 	component: () => import(/* webpackChunkName: "viewGoods" */ '@/views/viewGoods/viewGoods.vue'),
	// },

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

	// {
	// 	meta: {
	// 		chName: '商品管理',
	// 		selectRouteKey: 'distributorsGoods',
	// 		openRouteKey: 'distributorsGoods',
	// 	},
	// 	name: 'distributorsGoods',
	// 	path: '/distributorsGoods',
	// 	component: () => import(/* webpackChunkName: "distributorsGoods" */ '@/views/viewGoods/viewGoods.vue'),
	// },

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
			selectRouteKey: 'order',
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
					chName: '医院采购订单',
					selectRouteKey: 'purchaseOrder',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/purchaseOrder',
				name: 'purchaseOrder',
				component: () => import(/* webpackChunkName: "purchaseOrder" */ '@/views/warehouse/purchaseOrder.vue'),
			},
			{
				meta: {
					chName: '医院退货订单',
					selectRouteKey: 'salesReturnOrder',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/salesReturnOrder',
				name: 'salesReturnOrder',
				component: () => import(/* webpackChunkName: "salesReturnOrder" */ '@/views/warehouse/salesReturnOrder.vue'),
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
			},
			{
				meta: {
					chName: '采购单',
					selectRouteKey: 'purchaseList',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/purchaseList',
				name: 'purchaseList',
				component: () => import(/* webpackChunkName: "purchaseList" */ '@/views/warehouse/purchaseList.vue'),
			},
			{
				meta: {
					chName: '出货退货单',
					selectRouteKey: 'shipmentReturn',
					openRouteKey: 'warehouse',
				},
				path: '/warehouse/shipmentReturn',
				name: 'shipmentReturn',
				component: () => import(/* webpackChunkName: "shipmentReturn" */ '@/views/warehouse/shipmentReturn.vue'),
			}
		]
	},

	/**
	 * 🍉🍉🍉🍉
	 * 医院部分
	 * */

	//	🍎🍎🍎🍎🍎营养方案系统
	{
		meta: {
			chName: '用户列表',
			selectRouteKey: 'userList',
			//	有页面内的横向子路由
			hasTransverseSubPaths: true,
			//	虽然有子项，但作为一个项存在，而不是一个菜单
			isMenuItem: true,
		},
		path: '/userList',
		name: 'userList',
		component: UserList,
		children: [
			{
				meta: {
					chName: '病人信息',
					selectRouteKey: 'userList',
					transverseSubPaths: 'patientInfo',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/patientInfo/:patientInfoId',
				name: 'patientInfo',
				component: () => import(/* webpackChunkName: "patientInfo" */ '@/views/userList/patientInfo/patientInfo.vue'),
			},
			{
				meta: {
					chName: '筛查',
					selectRouteKey: 'userList',
					transverseSubPaths: 'screening',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/screening/:patientInfoId',
				name: 'screening',
				component: () => import(/* webpackChunkName: "screening" */ '@/views/userList/screening/screening.vue'),
			},
			{
				meta: {
					chName: '营养评估',
					selectRouteKey: 'userList',
					transverseSubPaths: 'assessment',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/assessment/:patientInfoId',
				name: 'assessment',
				component: () => import(/* webpackChunkName: "assessment" */ '@/views/userList/assessment/assessment.vue'),
			},
			{
				meta: {
					chName: '营养干预',
					selectRouteKey: 'userList',
					transverseSubPaths: 'intervention',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/intervention/:patientInfoId',
				name: 'intervention',
				component: () => import(/* webpackChunkName: "intervention" */ '@/views/userList/intervention/intervention.vue'),
			},
			{
				meta: {
					chName: '病程记录',
					selectRouteKey: 'userList',
					transverseSubPaths: 'progressNote',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/progressNote/:patientInfoId',
				name: 'progressNote',
				component: () => import(/* webpackChunkName: "progressNote" */ '@/views/userList/progressNote/progressNote.vue'),
			},
			{
				meta: {
					chName: '患者反馈',
					selectRouteKey: 'userList',
					transverseSubPaths: 'patientReply',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/patientReply/:patientInfoId',
				name: 'patientReply',
				component: () => import(/* webpackChunkName: "patientReply" */ '@/views/userList/patientReply/patientReply.vue'),
			},
			{
				meta: {
					chName: '活动小结',
					selectRouteKey: 'userList',
					transverseSubPaths: 'activityBrief',
					routerParamsKey: 'patientInfoId',
				},
				path: '/userList/activityBrief/:patientInfoId',
				name: 'activityBrief',
				component: () => import(/* webpackChunkName: "activityBrief" */ '@/views/userList/activityBrief/activityBrief.vue'),
			},
		],
	},
	{
		meta: {
			chName: '新增入院',
			selectRouteKey: 'userList',
		},
		path: '/userList/addAdmittedHospital',
		name: 'addAdmittedHospital',
		component: () => import(/* webpackChunkName: "admittedHospital" */ '@/views/userList/patientInfo/admittedHospital.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '确认入院',
			selectRouteKey: 'userList',
		},
		path: '/userList/admittedHospital/:patientInfoId',
		name: 'admittedHospital',
		component: () => import(/* webpackChunkName: "admittedHospital" */ '@/views/userList/patientInfo/admittedHospital.vue'),
		hidden: true,
	},

	{
		meta: {
			chName: '新增筛查',
			selectRouteKey: 'userList',
		},
		//	病人的id
		path: '/userList/addScreening/:patientInfoId',
		name: 'addScreening',
		component: () => import(/* webpackChunkName: "addScreening" */ '@/views/userList/screening/addScreening.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '筛查详情',
			selectRouteKey: 'userList',
		},
		path: '/userList/screeningDetail/:patientInfoId/:screeningDetailId',
		name: 'screeningDetail',
		component: () => import(/* webpackChunkName: "addScreening" */ '@/views/userList/screening/addScreening.vue'),
		hidden: true,
	},

	{
		meta: {
			chName: '新增营养评估',
			selectRouteKey: 'userList',
		},
		//	病人的id
		path: '/userList/addAssessment/:patientInfoId',
		name: 'addAssessment',
		component: () => import(/* webpackChunkName: "assessment" */ '@/views/userList/assessment/addAssessment.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '营养评估详情',
			selectRouteKey: 'userList',
		},
		path: '/userList/assessmentDetail/:patientInfoId/:assessmentDetailId',
		name: 'assessmentDetail',
		component: () => import(/* webpackChunkName: "assessment" */ '@/views/userList/assessment/addAssessment.vue'),
		hidden: true,
	},

	{
		meta: {
			chName: '营养营养干预详情',
			selectRouteKey: 'userList',
		},
		path: '/userList/interventionDetail/:patientInfoId/:interventionId',
		name: 'interventionDetail',
		component: () => import(/* webpackChunkName: "interventionDetail" */ '@/views/userList/intervention/interventionDetail.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '新增营养干预',
			selectRouteKey: 'userList',
		},
		//	病人的id
		path: '/userList/addIntervention',
		name: 'addIntervention',
		component: () => import(/* webpackChunkName: "addIntervention" */ '@/views/userList/intervention/addIntervention.vue'),
		hidden: true,
	},
	{
		meta: {
			chName: '营养营养干预详情',
			selectRouteKey: 'userList',
		},
		path: '/userList/editIntervention/:patientInfoId/:interventionId',
		name: 'editIntervention',
		component: () => import(/* webpackChunkName: "addIntervention" */ '@/views/userList/intervention/addIntervention.vue'),
		hidden: true,
	},

	{
		meta: {
			chName: '处方审核列表',
			selectRouteKey: 'auditList',
		},
		path: '/auditList',
		name: 'auditList',
		component: () => import(/* webpackChunkName: "doctor" */ '@/views/auditList/auditList.vue'),
	},
	{
		meta: {
			chName: '处方审核详情',
			selectRouteKey: 'auditList',
		},
		path: '/auditList/auditDetail/:auditDetailId',
		name: 'auditDetail',
		component: () => import(/* webpackChunkName: "auditDetail" */ '@/views/auditList/auditDetail.vue'),
		hidden: true
	},

	{
		meta: {
			chName: '配置任务',
			selectRouteKey: 'task',
		},
		path: '/task',
		name: 'task',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '配置任务',
					selectRouteKey: 'configuration',
					openRouteKey: 'task',
				},
				name: 'configuration',
				path: '/task/configuration',
				component: () => import(/* webpackChunkName: "configuration" */ '@/views/task/configuration.vue'),
			},
			{
				meta: {
					chName: '配置任务详情',
					selectRouteKey: 'configuration',
					openRouteKey: 'task',
				},
				name: 'configurationDetail',
				path: '/task/configurationDetail/:configurationDetailId',
				component: () => import(/* webpackChunkName: "configurationDetail" */ '@/views/task/configurationDetail.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '领药任务',
					selectRouteKey: 'getDrug',
					openRouteKey: 'task',
				},
				name: 'getDrug',
				path: '/task/getDrug',
				component: () => import(/* webpackChunkName: "getDrug" */ '@/views/task/getDrug.vue'),
			},
			{
				meta: {
					chName: '领药任务详情',
					selectRouteKey: 'getDrug',
					openRouteKey: 'task',
				},
				name: 'getDrugDetail',
				path: '/task/getDrugDetail/:getDrugDetailId',
				component: () => import(/* webpackChunkName: "getDrugDetail" */ '@/views/task/getDrugDetail.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '报损',
					selectRouteKey: 'taskReportedLoss',
					openRouteKey: 'task',
				},
				path: '/task/reportedLoss',
				name: 'taskReportedLoss',
				component: () => import(/* webpackChunkName: "reportedLoss" */ '@/views/warehouse/reportedLoss.vue'),
			},
		],
	},
	{
		meta: {
			chName: '收计费',
			selectRouteKey: 'cost',
		},
		path: '/cost',
		name: 'cost',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '收计费',
					selectRouteKey: 'costList',
					openRouteKey: 'cost',
				},
				name: 'costList',
				path: '/cost/costList',
				component: () => import(/* webpackChunkName: "costList" */ '@/views/cost/costList.vue'),
			},
			{
				meta: {
					chName: '退费记录',
					selectRouteKey: 'returnPremium',
					openRouteKey: 'cost',
				},
				name: 'returnPremium',
				path: '/cost/returnPremium',
				component: () => import(/* webpackChunkName: "returnPremium" */ '@/views/cost/returnPremium.vue'),
			},
			{
				meta: {
					chName: '缴费记录',
					selectRouteKey: 'paymentRecords',
					openRouteKey: 'cost',
				},
				name: 'paymentRecords',
				path: '/cost/paymentRecords',
				component: () => import(/* webpackChunkName: "paymentRecords" */ '@/views/cost/paymentRecords.vue'),
			},
		]
	},
	{
		meta: {
			chName: '月结',
			selectRouteKey: 'statement',
		},
		path: '/statement',
		name: 'statement',
		component: LayoutStair,
		children: [
			{
				meta: {
					chName: '月结',
					selectRouteKey: 'monthly',
					openRouteKey: 'statement',
				},
				name: 'monthly',
				path: '/statement/monthly',
				component: () => import(/* webpackChunkName: "monthly" */ '@/views/statement/monthly.vue'),
			},

			{
				meta: {
					chName: '日结',
					selectRouteKey: 'daily',
					openRouteKey: 'statement',
				},
				name: 'daily',
				path: '/statement/daily',
				component: () => import(/* webpackChunkName: "daily" */ '@/views/statement/daily.vue'),
			},
			{
				meta: {
					chName: '月结详情',
					selectRouteKey: 'monthly',
					openRouteKey: 'statement',
				},
				name: 'monthlyDetail',
				path: '/statement/monthlyDetail/:monthlyDetailId',
				component: () => import(/* webpackChunkName: "statementDetail" */ '@/views/statement/statementDetail.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '日结详情',
					selectRouteKey: 'daily',
					openRouteKey: 'statement',
				},
				name: 'dailyDetail',
				path: '/statement/dailyDetail/:dailyDetailId',
				component: () => import(/* webpackChunkName: "statementDetail" */ '@/views/statement/statementDetail.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '执行月结',
					selectRouteKey: 'monthly',
					openRouteKey: 'statement',
				},
				name: 'monthlyExecute',
				path: '/statement/execute/:monthlyExecuteId',
				component: () => import(/* webpackChunkName: "execute" */ '@/views/statement/execute.vue'),
				hidden: true,
			},
			{
				meta: {
					chName: '执行日结',
					selectRouteKey: 'daily',
					openRouteKey: 'statement',
				},
				name: 'dailyExecute',
				path: '/statement/execute/:dailyExecuteId',
				component: () => import(/* webpackChunkName: "execute" */ '@/views/statement/execute.vue'),
				hidden: true,
			},

		]
	}
]


//	⚠️原型图没有
// {
// 	meta: {
// 		chName: '新增用户',
// 		selectRouteKey: 'platformUser',
// 	},
// 	path: '/platformUser/newUser',
// 	name: 'newUser',
// 	component: () => import(/* webpackChunkName: "newUser" */ '@/views/platformUser/newUser.vue'),
// 	hidden: true,
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

// {
// 	meta: {
// 		chName: '新增家庭组',
// 		selectRouteKey: 'platformUser',
// 	},
// 	path: '/familyGroup/newFamilyGroup',
// 	name: 'newFamilyGroup',
// 	component: () => import(/* webpackChunkName: "newFamilyGroup" */ '@/views/familyGroup/newFamilyGroup.vue'),
// 	hidden: true,
// },


// {
// 	meta: {
// 		chName: '编辑用户',
// 		selectRouteKey: 'platformUser',
// 	},
// 	path: '/platformUser/editUser/:platformUserId',
// 	name: 'editUser',
// 	component: () => import(/* webpackChunkName: "newUser" */ '@/views/platformUser/editUser.vue'),
// 	hidden: true,
// },
