//	营养计划
export function deleteNutritionPlan(sItem: any, sIndex: number) {
	//	@ts-ignore
	this.data.splice(sIndex, 1);
}

//  新增营养计划
export function addNewLine() {
	//	@ts-ignore
	this.data.push({
		//	@ts-ignore
		key: this.data.length + 1,
		entryName: '',
		quantityUsed: '',
		usageTime: ''
	});
}