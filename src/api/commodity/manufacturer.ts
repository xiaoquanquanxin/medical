//	生产厂家分页列表
import request from "@/utils/request"

//	厂家分页列表		✅，缺少input
export function requestManufactorPage(data: any) {
	return request({
		url: '/api/manufactor/page',
		method: 'post',
		data,
	});
}

//	新增厂家			❌，404
export function requestManufactorInsert(data: any) {
	return request({
		url: '/api/manufactor/insert',
		method: 'post',
		data,
	});
}

//	编辑厂家
export function requestManufactorUpdate(data: any) {
	return request({
		url: '/api/manufactor/update',
		method: 'post',
		data,
	});
}

//	获取厂家信息
export function requestManufactorGet(id: string | number) {
	return request({
		url: `/api/manufactor/get/${id}`,
		method: 'get',
	});
}

//	删除厂家			⚠️原型无
export function requestManufactorDelete(id: string | number) {
	return request({
		url: `/api/manufactor/delete/${id}`,
		method: 'get',
	});
}


//	厂家信息列表			✅
export function requestManufactorList() {
	return request({
		url: '/api/manufactor/list',
		method: 'get',
	});
}


