import request from '@/utils/request';

//  处方审核分页			✅
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


