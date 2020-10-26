import request from '@/utils/request';

//	医院管理列表、医院列表	✅
export function requestHospitalPage(data: any) {
	return request({
		url: '/api/hospital/page',
		method: 'post',
		data,
	});
}

//	新增医院				❌，404，传参和原型不同
export function requestHospitalSave(data: any) {
	return request({
		url: '/api/hospital/save',
		method: 'post',
		data,
	});
}

//	编辑医院
export function requestHospitalUpdate(data: any) {
	return request({
		url: '/api/hospital/update',
		method: 'post',
		data,
	});
}

//	删除医院
export function requestHospitalDelete(id: string | number) {
	return request({
		url: `/api/category/delete/${id}`,
		method: 'get',
	});
}


//	全部医院
export function requestHospitalGetList() {
	return request({
		url: '/api/hospital/getList',
		method: 'get',
	});
}


//	获取医院信息		✅
export function requestHospitalGet(id: string | number) {
	return request({
		url: `/api/category/get/${id}`,
		method: 'get',
	});
}

//	缺医院详情接口
