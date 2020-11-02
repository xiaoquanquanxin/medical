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

//	新增入库单
export function requestWarehouseReceiptInsert(data: any) {
	return request({
		url: '/api/warehouse-receipt/insert',
		method: 'post',
		data,
	});
}


