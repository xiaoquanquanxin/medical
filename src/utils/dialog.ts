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