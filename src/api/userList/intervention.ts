import request from '@/utils/request';

//	处方列表分页[营养干预分页]		✅，传参和原型不一样
export function requestPrescriptionPage(data: any) {
	return request({
		url: '/api/prescription/page',
		method: 'post',
		data,
	});
}



