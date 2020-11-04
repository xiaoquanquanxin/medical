import request from '@/utils/request';

//  订单管理列表
export function requestOrderPage(data: {
	"current": number,
	"orderCode": string,
	"patientName": string
	"payStatus": number,
	"prescriptionCode": string
	"size": number
}) {
	return request({
		url: '/api/order/page',
		method: 'post',
		data,
	});
}

//	获取订单详情
export function requestOrderDetails(id: string | number) {
	return request({
		url: `/api/order/details/${id}`,
		method: 'get',
	});
}


