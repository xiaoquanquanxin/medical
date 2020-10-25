import request from '@/utils/request';

//	处方列表分页[营养干预分页]		✅，传参和原型不一样
export function requestPrescriptionPage(data: any) {
	return request({
		url: '/api/prescription/page',
		method: 'post',
		data,
	});
}

//	查询当前医院的处方模板
export function requestPrescriptionPrescriptionTpl(data: any) {
	return request({
		url: '/api/prescription/prescriptionTpl',
		method: 'post',
		data,
	});
}


//	保存处方
export function requestPrescriptionSave(data: any) {
	return request({
		url: '/api/prescription/save',
		method: 'post',
		data,
	});
}

