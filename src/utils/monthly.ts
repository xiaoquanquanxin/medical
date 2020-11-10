import moment from 'moment';
import {oneDataTimestamp} from "@/utils/constants"

const date = new Date;

//  选择日期范围
export function onRangePickerChange(value: any, selectDateValue: []) {
	//	@ts-ignore
	this.searchData.settleStarttime = selectDateValue[0];
	//	@ts-ignore
	this.searchData.settleEndtime = selectDateValue[1];
}

//	截止日
const deadlineDate = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/01`).getTime() - oneDataTimestamp;
//	截止日之前
const earlierDeadlineDate = new Date(`${date.getFullYear()}/${date.getMonth()}/01`).getTime() - oneDataTimestamp;

//	月结的截止日
export function disabledDateForMonthly(current: any) {
	return current && current > moment(deadlineDate);
}

//  今天之前
export function beforeToday(current: any) {
	return current && current >= moment(new Date(new Date().getTime() - oneDataTimestamp));
}

//  今天以及以后
export function todayAndAfterToday(current: any) {
	return current && current <= moment(new Date(new Date().getTime() - oneDataTimestamp));
}


//	默认展开的面板
export const defaultPickerValueForMonthly = [moment(earlierDeadlineDate), moment(deadlineDate)];
