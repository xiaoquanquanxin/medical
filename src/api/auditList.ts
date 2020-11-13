import request from '@/utils/request';

//  处方审核分页			✅，⚠️文档️请求参数非常多
export function requestPrescriptionAuditPage(data: any) {
	return request({
		url: '/api/prescription/audit/page',
		method: 'post',
		data,
	});
}

//	处方审核状态更改
export function requestPrescriptionAuditUpdate(data: any) {
	return request({
		url: '/api/prescription/audit/update',
		method: 'post',
		data,
	});
}

//	作废按钮的状态
export function requestPrescriptionCancelPrescription(id: string | number) {
	return request({
		url: `/api/prescription/cancelPrescription/${id}`,
		method: 'get',
	});
}


