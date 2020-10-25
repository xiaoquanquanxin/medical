//	供应商列表
import request from '@/utils/request';

//  供应商管理列表	✅
export function requestSupplierPage(data: any) {
	return request({
		url: '/api/supplier/page',
		method: 'post',
		data,
	});
}

//	新增供应商	❌404
export function requestSupplierInsert(data: any) {
	return request({
		url: '/api/supplier/insert',
		method: 'post',
		data,
	});
}

//	编辑供应商	❌404
export function requestSupplierUpdate(data: any) {
	return request({
		url: '/api/supplier/update',
		method: 'post',
		data,
	});
}

//	查看仓库信息
export function requestSupplierGet(id: string | number) {
	return request({
		url: `/api/supplier/get/${id}`,
		method: 'get',
	});
}

//	删除仓库信息	⚠️原型无
export function requestSupplierDelete(id: string | number) {
	return request({
		url: `/api/supplier/delete/${id}`,
		method: 'get',
	});
}

//  供应商列表		✅
export function requestSupplierList() {
	return request({
		url: '/api/supplier/list',
		method: 'get'
	});
}
