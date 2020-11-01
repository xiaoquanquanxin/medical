//	出货退货单
import request from '@/utils/request';

//  商品库存
export function requestGoodsGoodsStock16(data: any) {
	return request({
		url: '/api/goods/goodsStock',
		method: 'post',
		data,
	});
}

//	出货退货
export function requestGoodsGoodsDelivery(data: any) {
	return request({
		url: '/api/goods/goodsDelivery',
		method: 'post',
		data,
	});
}


