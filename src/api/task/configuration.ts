import request from '@/utils/request';

//	配置分页			✅
export function requestPrescriptionConfigPzrw(data: any) {
	return request({
		url: '/api/prescription/config/pzrw',
		method: 'post',
		data,
	});
}

//	确认领药，确认签收，确认配置,
export function requestPrescriptionConfigConfirmSave(data: any) {
	return request({
		url: '/api/prescription/config/confirmSave',
		method: 'post',
		data,
	});
}

//	配置单详情
export function requestPrescriptionConfigConfirmDetail(id: number | string) {
	return request({
		url: `/api/prescription/config/configDetails/${id}`,
		method: 'get',
	});
}

//	领药详情
export function requestPrescriptionConfigGetMedicineDetails(id: number | string) {
	return request({
		url: `/api/prescription/config/getMedicineDetails/${id}`,
		method: 'get',
	});
}





