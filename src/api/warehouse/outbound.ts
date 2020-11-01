//	出库
import request from '@/utils/request';

//  商品库存
export function requestGoodsGoodsStock13(data: any) {
	return request({
		url: '/api/goods/goodsStock',
		method: 'post',
		data,
	});
}

//	发货
export function requestGoodsGoodsDelivery(data: any) {
	return request({
		url: '/api/goods/goodsDelivery',
		method: 'post',
		data,
	});
}


