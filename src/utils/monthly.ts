//  选择日期范围
export function onRangePickerChange(value: any, selectDateValue: []) {
	//	@ts-ignore
	this.searchData.settleStarttime = selectDateValue[0];
	//	@ts-ignore
	this.searchData.settleEndtime = selectDateValue[1];
}
