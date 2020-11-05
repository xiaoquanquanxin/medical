//	报损
//	入库
import request, {unifiedHandlingList} from '@/utils/request';

//  报损列表
export function requestLossReportPages(data: any) {
	return request({
		url: '/api/loss-report/pages',
		method: 'post',
		data,
	});
}


//	新增报损单
export function requestLossReportInsert(data: {
	//  商品id
	goodsId: number,
	//  批号
	batchNumber: string
	//  单位名称
	unitName: string
	//  报损数量
	num: number,
	//  医院id
	// hospitalId: number,
	//  报损原因
	reason: string
	//  生成日期
	manufactureDate: string
	//  备注
	remark: string
	//  报损单编码
	// lossReportCode: string
}) {
	return request({
		url: '/api/loss-report/insert',
		method: 'post',
		data,
	});
}


//	删除报损单
export function requestLossReportDelete(id: string | number) {
	return request({
		url: `/api/loss-report/delete/${id}`,
		method: 'post',
	});
}


//	发送报损单
export function requestLossReportSend(id: any) {
	return request({
		url: `/api/loss-report/send/${id}`,
		method: 'get',
	});
}


//	获取商品列表			⚠️特殊的报损新增用的
export function requestGoodsLossReportGoodsList() {
	return request({
		url: '/api/goods/lossReportGoodsList',
		method: 'get',
	})
		.then(unifiedHandlingList)
}


