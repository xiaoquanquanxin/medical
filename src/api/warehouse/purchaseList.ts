//	采购单管理
import request, {unifiedHandlingList} from '@/utils/request';

//  采购订单管理
export function requestPurchaseOrderPages(data: any) {
	return request({
		url: '/api/purchaseOrder/pages',
		method: 'post',
		data,
	});
}

//	新增采购单
//	商品id    采购单位   单位id   数量  备注
export function requestPurchaseOrderInsert(data: {
	//	商品id			✅
	goodsId: number,
	//	采购单号
	purchaseOrderCode: string,
	//	医院id
	hospitalId: number,
	//	采购单位
	purchaseOrderUnit: string,
	//	采购单位id			✅
	purchaseOrderUnitId: number,
	//	采购数量				✅
	purchaseOrderNum: number,
	//	采购单状态 1 待发货  2 待签收  3 已签收
	status: number,
	//	备注					✅
	remark: string,
}) {
	return request({
		url: '/api/purchaseOrder/insert',
		method: 'post',
		data,
	});
}

//	获取商品列表			⚠️特殊的采购单新增用的
export function requestGoodsGoodsPurchaseList() {
	return request({
		url: '/api/goods/goodsPurchaseList',
		method: 'get',
	})
		.then(unifiedHandlingList)
}

//	/api/goods/goodsPurchaseList

//	发货详情
export function requestDeliveryRecordGet(id: string | number) {
	return request({
		url: `/api/delivery-record/get/${id}`,
		method: 'get',
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

