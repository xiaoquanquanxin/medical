import request from '@/utils/request';

//  商品库存
export function requestGoodsGoodsStock(data: any) {
	return request({
		url: '/api/goods/goodsStock',
		method: 'post',
		data,
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


