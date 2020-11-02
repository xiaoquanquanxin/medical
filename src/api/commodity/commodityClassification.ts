import request, {unifiedHandlingList} from "@/utils/request"

//	商品分类分页列表		✅，⚠️缺input
export function requestCategoryPage(data: any) {
	return request({
		url: '/api/category/page',
		method: 'post',
		data,
	});
}

//	新增商品分类			✅，⚠️缺分类编码，看原型新增功能
export function requestCategoryInsert(data: any) {
	return request({
		url: '/api/category/insert',
		method: 'post',
		data,
	});
}

//	编辑商品分类			✅
export function requestCategoryUpdate(data: any) {
	return request({
		url: '/api/category/update',
		method: 'post',
		data,
	});
}

//	获取商品分类信息		✅
export function requestCategoryGet(id: string | number) {
	return request({
		url: `/api/category/get/${id}`,
		method: 'get',
	});
}

//	删除商品分类			✅
export function requestCategoryDelete(id: string | number) {
	return request({
		url: `/api/category/delete/${id}`,
		method: 'get',
	});
}


//	获取商品分类列表		✅
export function requestCategoryList() {
	return request({
		url: `/api/category/list`,
		method: 'get',
	})
		.then(unifiedHandlingList)
}




