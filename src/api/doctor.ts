import request from '@/utils/request';

//  医生列表				❌，404，原来是有的，后来就没了
export function requestDoctorPage(data: any) {
	return request({
		url: '/api/doctor/page',
		method: 'post',
		data,
	});
}

//	新增医生
export function requestDoctorSave(data: any) {
	return request({
		url: '/api/doctor/save',
		method: 'post',
		data,
	});
}

//	编辑医生
export function requestDoctorUpdate(data: any) {
	return request({
		url: '/api/doctor/update',
		method: 'post',
		data,
	});
}

//	缺少医生详情接口

//	删除医生		⚠️原型无
export function requestDoctorDelete(id: string | number) {
	return request({
		url: `/api/doctor/delete/${id}`,
		method: 'delete',
		data: {id,}
	});
}

