import request from '@/utils/request';

//	病程记录分页		✅，回现参数不对
export function requestDiseaseRecordPage(data: any) {
	return request({
		url: '/api/diseaseRecord/page',
		method: 'post',
		data,
	});
}

//	病程记录新增		✅
export function requestDiseaseRecordSave(data: any) {
	return request({
		url: '/api/diseaseRecord/save',
		method: 'post',
		data,
	});
}

//	根据ID查询病程记录	✅
export function requestDiseaseRecordGet(id: string | number) {
	return request({
		url: `/api/diseaseRecord/getById/${id}`,
		method: 'get',
	});
}

//	删除病程记录		⚠️原型无
export function requestDiseaseRecordDelete(id: string | number) {
	return request({
		url: `/api/diseaseRecord/delete/${id}`,
		method: 'get',
	});
}
