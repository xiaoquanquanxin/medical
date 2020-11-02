import request, {unifiedHandlingList} from "@/utils/request"

//	品牌分页列表			✅，⚠️缺input
export function requestBrandPage(data: any) {
	return request({
		url: '/api/brand/page',
		method: 'post',
		data,
	});
}

//	新增商品分类			❌，404
export function requestBrandInsert(data: any) {
	return request({
		url: '/api/brand/insert',
		method: 'post',
		data,
	});
}

//	编辑商品分类
export function requestBrandUpdate(data: any) {
	return request({
		url: '/api/brand/update',
		method: 'post',
		data,
	});
}

//	获取商品分类信息
export function requestBrandGet(id: string | number) {
	return request({
		url: `/api/brand/get/${id}`,
		method: 'get',
	});
}


//	删除商品分类			⚠️文档无
export function requestBrandDelete(id: string | number) {
	return request({
		url: `/api/brand/delete/${id}`,
		method: 'get',
	});
}

//	品牌列表接口			✅
export function requestBrandList() {
	return request({
		url: '/api/brand/list',
		method: 'get',
	})
		.then(unifiedHandlingList)
}



