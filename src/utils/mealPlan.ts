//	营养计划
export function deleteNutritionPlan(sItem: any, sIndex: number) {
	//	@ts-ignore
	this.data.splice(sIndex, 1);
}

//  新增营养计划
export function addNewLine() {
	//	@ts-ignore
	const lastItem = this.data[this.data.length - 1] || {key: 0};
	//	@ts-ignore
	this.data.push({
		//	@ts-ignore
		key: lastItem.key + 1,
		//	@ts-ignore
		index: this.data.length + 1,
		entryName: '',
		quantityUsed: '',
		usageTime: ''
	});
}

