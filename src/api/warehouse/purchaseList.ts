//	采购单
import request from '@/utils/request';

//  商品库存
export function requestPurchaseOrderPagesOrder(data: any) {
	return request({
		url: '/api/purchaseOrder/pagesOrder',
		method: 'post',
		data,
	});
}

//	提醒返货
export function tixingfahuo(data: any) {
	return request({
		url: '/api/goods/goodsDelivery',
		method: 'post',
		data,
	});
}


//	确认签收
export function querenqianshou(data: any) {
	return request({
		url: '/api/goods/goodsDelivery',
		method: 'post',
		data,
	});
}

