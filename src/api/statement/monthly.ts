import request from "@/utils/request"

//	月结列表
export function requestSettlementPage(data: any) {
	return request({
		url: '/api/settlement/page',
		method: 'post',
		data,
	});
}

//	执行月结查询区间内已支付订单
export function requestSettlementMonthOverSelect(data: any) {
	return request({
		url: '/api/settlement/monthOverSelect',
		method: 'post',
		data,
	});
}

