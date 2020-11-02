import request, {unifiedHandlingList} from '@/utils/request';

//  仓库管理列表	✅，⚠️input不好使，缺少地区
export function requestWarehousePage(data: any) {
	return request({
		url: '/api/warehouse/page',
		method: 'post',
		data,
	});
}

//  新增仓库		✅，⚠️地区待检测
export function requestWarehouseInsert(data: any) {
	return request({
		url: '/api/warehouse/insert',
		method: 'post',
		data,
	});
}

//  修改仓库信息	✅，⚠️同上
export function requestWarehouseUpdate(data: any) {
	return request({
		url: '/api/warehouse/update',
		method: 'post',
		data,
	});
}

//	查看仓库信息	✅✅
export function requestWarehouseGet(id: string | number) {
	return request({
		url: `/api/warehouse/get/${id}`,
		method: 'get',
	});
}

//	删除仓库信息	⚠️原型无
export function requestWarehouseDelete(id: string | number) {
	return request({
		url: `/api/warehouse/delete/${id}`,
		method: 'get',
	});
}

//	仓库不分页接口			⚠️编辑的，没仓库
export function requestWarehouseList() {
	return request({
		url: '/api/warehouse/list',
		method: 'get',
	})
		.then(unifiedHandlingList);
}
