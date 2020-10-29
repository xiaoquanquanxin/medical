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

//	确认月结
export function requestSettlementMosSave(data: any) {
	return request({
		url: '/api/settlement/mosSave',
		method: 'post',
		data,
	});
}

//	月结详情列表分页
export function requestSettlementyjxq(data: any) {
	return request({
		url: '/api/settlement/yjxq',
		method: 'post',
		data,
	});
}



