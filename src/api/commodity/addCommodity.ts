//	新增商品、编辑商品、查看商品

//	获取商品单位 下拉
import request, {unifiedHandlingList} from "@/utils/request"

//	获取商品信息
export function requestGoodsGet(id: string | number) {
	return request({
		url: `/api/goods/get/${id}`,
		method: 'get',
	});
}

//	新增商品
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

//	单位下拉
export function requestGoodsUnitType() {
	return request({
		url: '/api/goods/unitType',
		method: 'get',
	})
		.then(unifiedHandlingList)
}


