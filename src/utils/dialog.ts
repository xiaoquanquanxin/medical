//  莫泰框数据
export const dialogData = {
	//  是否展示莫泰框
	visible: false,
	//  提交按钮loading
	submitLoading: false,
	//	标题
	title: null,
};

//  莫泰框方法
//  开启、关闭莫泰框
export const dialogMethods = {
	showModal() {
		// @ts-ignore
		this.dialogData.visible = true;
	},
	hideModal() {
		// @ts-ignore
		this.dialogData.visible = false;
	},
	//	设置莫泰框标题名称
	setDialogTitle(title: string | null) {
		// @ts-ignore
		this.dialogData.title = title;
	}
};