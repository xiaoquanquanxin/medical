//  莫泰框数据

interface DialogItem {
	visible: boolean;
	title: string;
}

interface DialogData {
	[key: string]: DialogItem;
}

export const dialogData: DialogData = {
	// //  是否展示莫泰框
	// visible: false,
	// //  提交按钮loading
	// submitLoading: false,
	// //	标题
	// title: null,
};


interface DialogType {
	[key: string]: string;
}

//	莫泰框的区分类型，每个用到穿梭框的都要有引入
export const DIALOG_TYPE: DialogType = {
	//	查看市场价格弹框
	VIEW_MARKET_PRICE: 'VIEW_MARKET_PRICE',
	//  查看市场价格弹框
	AUTHORIZATION: 'AUTHORIZATION',
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
}


//  莫泰框方法
//  开启、关闭莫泰框
export const dialogMethods = {
	initModal(dialogKey: string, title?: string) {
		return dialogData[dialogKey] = {
			visible: false,
			title: title || '',
		};
	},
	showModal(dialogKey: string) {
		// @ts-ignore
		dialogData[dialogKey].visible = true;
	},
	hideModal(dialogKey: string) {
		// @ts-ignore
		dialogData[dialogKey].visible = false;
	},
	//	设置莫泰框标题名称
	setDialogTitle(dialogKey: string, title: string = '') {
		dialogData[dialogKey].title = title;
	}
};