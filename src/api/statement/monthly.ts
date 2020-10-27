import request from "@/utils/request"

//	月结列表
export function requestSettlementPage(data: any) {
	return request({
		url: '/api/settlement/page',
		method: 'post',
		data,
	});
}
