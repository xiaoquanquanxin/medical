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


//	根据处方ID查询[处方详情]，详情页面，只取prescriptionDetail字段中的JSON进行渲染
export function requestPrescriptionDetail(prescriptionId: number | string) {
	return request({
		url: `/api/prescription/detail/${prescriptionId}`,
		method: 'get',
	});
}


