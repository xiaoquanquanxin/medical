//	病人信息、直接编辑用的 描述框的方法
export const descriptionsMethods = {
	//	聚焦事件
	descriptionFormFocusFn(activeElementId: number) {
		//	@ts-ignore
		this.activeElementId = activeElementId;
		//	console.log(activeElementId);
	},
	//	失焦事件
	descriptionFormBlurFn(key: string) {
		//	@ts-ignore
		this.activeElementId = null;
		//	@ts-ignore
		const value = this.patientBasicInfo[key];
		if (typeof value === "number") {
			return
		}
		//	@ts-ignore
		this.patientBasicInfo[key] = (this.patientBasicInfo[key] || '').trim();
	},
	//	点击事件
	descriptionFormClickFn(activeElementId: number, event: any) {
		//	@ts-ignore
		this.activeElementId = activeElementId;
		const td = event.target.parentNode;
		//	@ts-ignore
		this.$nextTick(() => {
			const el = td.querySelector('.form-element');
			if (!el.classList.contains('ant-input-number')) {
				el.focus();
				return
			}
			//	是数字类型
			el.querySelector('.ant-input-number-input').focus();
		});
	},
}


