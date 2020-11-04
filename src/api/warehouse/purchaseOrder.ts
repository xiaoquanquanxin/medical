//	入库
import request from '@/utils/request';

//  医院采购订单
export function requestPurchaseOrderPages(data: any) {
	return request({
		url: '/api/purchaseOrder/pages',
		method: 'post',
		data,
	});
}


//	入库
export function requestGoodsGoodsDelivery(data: any) {
	return request({
		url: '/api/goods/goodsDelivery',
		method: 'post',
		data,
	});
}


//	获取采购单信息
export function requestPurchaseOrderGet(id: string | number) {
	return request({
		url: `/api/purchaseOrder/get/${id}`,
		method: 'get',
	});
}



//	发货接口
export function requestDeliveryRecordDelivery(data: any) {
	return request({
		url: '/api/delivery-record/delivery',
		method: 'post',
		data,
	});
}

