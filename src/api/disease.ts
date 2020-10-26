import request from '@/utils/request';

//  疾病列表			✅✅
export function requestDiseasePage(data: any) {
	return request({
		url: '/api/disease/page',
		method: 'post',
		data,
	});
}

//	新增疾病			✅✅
export function requestDiseaseSave(data: any) {
	return request({
		url: '/api/disease/save',
		method: 'post',
		data,
	});
}

//	编辑疾病			✅✅
export function requestDiseaseUpdate(data: any) {
	return request({
		url: '/api/disease/update',
		method: 'post',
		data,
	});
}

//	修改疾病状态		✅✅
export function requestDiseaseChangeStatus(id: string | number) {
	return request({
		url: `/api/disease/changeStatus/${id}`,
		method: 'get',
	});
}


//	删除疾病		⚠️原型无
export function requestDiseaseDelete(id: string | number) {
	return request({
		url: `/api/disease/delete/${id}`,
		method: 'delete',
		data: {id,}
	});
}

//	疾病详情			✅✅
export function requestDiseaseGet(id: string | number) {
	return request({
		url: `/api/disease/get/${id}`,
		method: 'get'
	});
}



