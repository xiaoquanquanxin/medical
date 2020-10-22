//	病人信息、直接编辑用的 描述框的方法
export const descriptionsMethods = {
	//	聚焦事件
	descriptionFormFocusFn(activeElementId: number) {
		//	@ts-ignore
		this.activeElementId = activeElementId;
		//	console.log(activeElementId);
	},
	//	点击事件
	descriptionFormClickFn(activeElementId: number, event: any) {
		//	@ts-ignore
		this.activeElementId = activeElementId;
		const td = event.target.parentNode;
		//	@ts-ignore
		this.$nextTick(() => {
			const el = td.querySelector('.form-element');
			el.focus();
		});
	},
}