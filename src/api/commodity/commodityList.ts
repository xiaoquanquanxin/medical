import request, {unifiedHandlingList} from '@/utils/request';

//	商品分页列表	✅
export function requestGoodsPage(data: any) {
	return request({
		url: '/api/goods/page',
		method: 'post',
		data,
	});
}

//	新增商品		❌，404
export function requestGoodsInsert(data: any) {
	return request({
		url: '/api/goods/insert',
		method: 'post',
		data,
	});
}

//	编辑商品
export function requestGoodsUpdate(data: any) {
	return request({
		url: '/api/goods/update',
		method: 'post',
		data,
	});
}

//	获取商品信息
export function requestGoodsGet(id: string | number) {
	return request({
		url: `/api/goods/get/${id}`,
		method: 'get',
	});
}

//	商品授权渠道商
export function requestGoodsAuthorize(data: any) {
	return request({
		url: '/api/goods/authorize',
		method: 'post',
		data,
	});
}

//	删除商品		⚠️原型无
export function requestGoodsDelete(id: string | number) {
	return request({
		url: `/api/goods/delete/${id}`,
		method: 'get',
	});
}

//	根据医院获取商品
export function requestGoodsListByHospital(hospitalId: string | number) {
	return request({
		url: `/api/goods/list/${hospitalId}`,
		method: 'get',
	});
}

//	缺少：市场价


//	获取商品单位 下拉
export function requestGoodsUnitType() {
	return request({
		url: '/api/goods/unitType',
		method: 'get',
	})
		.then(unifiedHandlingList)
}