import moment from 'moment';

//  选择日期范围
export function onRangePickerChange(value: any, selectDateValue: []) {
	//	@ts-ignore
	this.searchData.settleStarttime = selectDateValue[0];
	//	@ts-ignore
	this.searchData.settleEndtime = selectDateValue[1];
}


//	月结的禁止日期
export function disabledDateForMonthly(current: any) {
	//	console.log(current);
	//	new Date().getMonth()
	console.log(moment().endOf('day'))
	return current && current > moment().endOf('day');

}