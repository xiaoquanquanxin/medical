import request from '@/utils/request';

//	收计费列表分页			✅
export function requestBillingsBillingPage(data: any) {
	return request({
		url: '/api/billings/billingPage',
		method: 'post',
		data,
	});
}

//	缴费
export function requestBillingsPayment(data: any) {
	return request({
		url: '/api/billings/payment',
		method: 'post',
		data,
	});
}

//	退费
export function requestBillingsRefund(data: any) {
	return request({
		url: '/api/billings/refund',
		method: 'post',
		data,
	});
}

//	收计费详情
export function requestBillingsBillingDetails(id: string | number) {
	return request({
		url: `/api/billings/billingDetails/${id}`,
		method: 'get',
	});
}


