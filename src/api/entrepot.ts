import request from '@/utils/request';

//  仓库管理列表	✅
export function requestWarehousePage(data: any) {
	return request({
		url: '/api/warehouse/page',
		method: 'post',
		data,
	});
}

//  新增仓库
export function requestWarehouseInsert(data: any) {
	return request({
		url: '/api/warehouse/insert',
		method: 'post',
		data,
	});
}

//  修改仓库信息
export function requestWarehouseUpdate(data: any) {
	return request({
		url: '/api/warehouse/update',
		method: 'post',
		data,
	});
}

//	删除仓库信息
export function requestWarehouseDelete(id: string | number) {
	return request({
		url: `/api/warehouse/delete/${id}`,
		method: 'get',
	});
}

//	查看仓库信息	✅
export function requestWarehouseGet(id: string | number) {
	return request({
		url: `/api/warehouse/get/${id}`,
		method: 'get',
	});
}
