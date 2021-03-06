//  莫泰框数据

interface DialogItem {
	//	是否展示莫泰框
	visible: boolean;
	//	标题
	title: string;
	//	莫泰框确认按钮的状态 false 可用
	confirmLoading: boolean;
}

interface DialogData {
	[key: string]: DialogItem;
}

export const dialogData: DialogData = {};


interface DialogType {
	[key: string]: string;
}

//	莫泰框的区分类型，每个用到穿梭框的都要有引入
export const DIALOG_TYPE: DialogType = {
	//	新增、编辑仓库
	ENTREPOT: 'ENTREPOT',
	//  新增、编辑渠道商
	DISTRIBUTORS: 'DISTRIBUTORS',
	//  查看普通用户
	VIEW_ORDINARY_USER: 'VIEW_ORDINARY_USER',
	//	编辑患者用户
	PATIENTS_USER: 'PATIENTS_USER',

	//	商品-查看市场价格弹框
	VIEW_MARKET_PRICE: 'VIEW_MARKET_PRICE',
	//  商品-授权渠道商
	AUTHORIZATION_DISTRIBUTORS: 'AUTHORIZATION_DISTRIBUTORS',
	//  商品-授权医院
	AUTHORIZATION_HOSPITAL: 'AUTHORIZATION_HOSPITAL',
	//  新增、编辑分类管理莫泰框
	ADD_CLASSIFICATION: 'ADD_CLASSIFICATION',
	//	新增、编辑品牌管理莫泰框
	ADD_BRAND: 'ADD_BRAND',
	//	新增、编辑生产厂家莫泰框
	ADD_MANUFACTURER: 'ADD_MANUFACTURER',
	//	医院管理 - 关联科室
	RELATED_DEPARTMENTS: 'RELATED_DEPARTMENTS',
	//	医院管理 - 关联渠道商
	ASSOCIATED_CHANNEL_PROVIDER: 'ASSOCIATED_CHANNEL_PROVIDER',
	//	科室管理 - 关联疾病
	ASSOCIATED_DISEASE: 'ASSOCIATED_DISEASE',
	//	科室管理 - 关联评估调查表
	QUESTIONNAIRE: 'QUESTIONNAIRE',


	//	查看总库存
	VIEW_TOTAL_INVENTORY: 'VIEW_TOTAL_INVENTORY',
	//	采购操作
	PROCUREMENT: 'PROCUREMENT',
	//	退货操作
	SALES_RETURN: 'SALES_RETURN',

	//	出库操作
	OUTBOUND: 'OUTBOUND',
	//	入库操作
	PUT_IN_STORE_ID: 'PUT_IN_STORE_ID',
	//	报损操作
	REPORTED_LOST: 'REPORTED_LOST',

	//	发货操作
	SHIPMENTS: 'SHIPMENTS',
	//	采购详情
	PROCUREMENT_DETAILS: 'PROCUREMENT_DETAILS',
	//	新增采购单
	PROCUREMENT_INSERT:'PROCUREMENT_INSERT',

	//	出货退货
	SHIPMENT_RETURN_FORM: 'SHIPMENT_RETURN_FORM',

	//	确认签收
	DETERMINE_SIGN: 'DETERMINE_SIGN',

	//	病程记录弹框
	PROGRESS_NOTE: 'PROGRESS_NOTE',

	//	患者反馈弹框
	PATIENT_REPLY: 'PATIENT_REPLY',

	//	活动小结弹框
	ACTIVITY_BRIEF: 'ACTIVITY_BRIEF',

	//	收计费 - 缴费
	PAY_COST: 'PAY_COST',
	//	收计费 - 退费	⚠️ 被上面的缴费取代
	// RETURN_COST: 'RETURN_COST',

	//  新增、编辑、查看角色
	ROLE: 'ROLE',
	//	角色-权限
	ROLE_AUTHORITY: 'ROLE_AUTHORITY',
	//	新增、编辑，账号
	ACCOUNT: 'ACCOUNT',
	//	菜单
	MENU: "MENU",


	//	驳回
	REJECT: 'REJECT',


	//	院内院外
	//	选择计划
	CHOOSE_PLAN: 'CHOOSE_PLAN',
	CHOOSE_PLAN2: 'CHOOSE_PLAN2',
	//	选择商品
	CHOOSE_COMMODITY: 'CHOOSE_COMMODITY',
	//	新增时间
	ADD_TIME: 'ADD_TIME',

}


//  莫泰框方法
//  开启、关闭莫泰框
export const dialogMethods = {
	initModal(dialogKey: string, title?: string) {
		return dialogData[dialogKey] = {
			visible: false,
			title: title || '',
			//	默认可以点击莫泰框
			confirmLoading: false,
		};
	},
	//	打开莫泰框
	showModal(dialogKey: string) {
		// @ts-ignore
		dialogData[dialogKey].visible = true;
	},
	//	关闭motion
	hideModal(dialogKey: string) {
		// @ts-ignore
		dialogData[dialogKey].visible = false;
	},
	//	设置莫泰框标题名称
	setDialogTitle(dialogKey: string, title: string = '') {
		dialogData[dialogKey].title = title;
	},
	//	点击按钮是否可用
	setConfirmLoading(dialogKey: string, confirmLoading: boolean) {
		dialogData[dialogKey].confirmLoading = confirmLoading;
	}
};