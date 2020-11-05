import request from '@/utils/request';

//  商品库存
export function requestGoodsGoodsStock(data: any) {
	return request({
		url: '/api/goods-stock/goodsStock',
		method: 'post',
		data,
	});
}

//	获取医院库存
export function requestGoodsStockGetHospitalStock(id: string | number) {
	return request({
		url: `/api/goods-stock/getHospitalStock/${id}`,
		method: 'post',
	});
}

//	采购
export function requestGoodsGoodsPurchase(data: any) {
	return request({
		url: '/api/goods/goodsPurchase',
		method: 'post',
		data,
	});
}

//	退货
export function requestGoodsReturnOrder(data: any) {
	return request({
		url: '/api/goods/returnOrder',
		method: 'post',
		data,
	});
}

//	productionTime 生产时间
//	validUntil 有效期至


//	/api/purchaseOrder/get/{id}
