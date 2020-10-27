import request from '@/utils/request';

//	配置分页			✅，⚠️接口文档请求参数和原型不同，这块原型有很多input和select
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





