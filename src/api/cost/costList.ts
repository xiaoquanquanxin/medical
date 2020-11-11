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

//	缺少详情接口【开会说这个应该是处方审核列表的详情，我可以直接处理】，进行缴费需要先调缴费详情等等