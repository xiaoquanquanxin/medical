import request from '@/utils/request';

//	处方模板分页			✅
export function requestPrescriptionTemplatePage(data: any) {
	return request({
		url: '/api/prescription-template/page',
		method: 'post',
		data,
	});
}

//	新增处方模板			✅
export function requestPrescriptionTemplateInsert(data: any) {
	return request({
		url: '/api/prescription-template/insert',
		method: 'post',
		data,
	});
}

//	编辑处方模板
export function requestPrescriptionTemplateUpdate(data: any) {
	return request({
		url: '/api/prescription-template/update',
		method: 'post',
		data,
	});
}

//	获取处方模板信息
export function requestPrescriptionTemplateGet(id: string | number) {
	return request({
		url: `/api/prescription-template/get/${id}`,
		method: 'get',
	});
}

//	删除处方模板			✅
export function requestPrescriptionTemplateDelete(id: string | number) {
	return request({
		url: `/api/prescription-template/delete/${id}`,
		method: 'get',
	});
}

