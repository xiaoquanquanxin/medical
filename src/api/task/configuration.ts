import request from '@/utils/request';

//	配置分页			✅，⚠️接口文档请求参数和原型不同
export function requestPrescriptionConfigPzrw(data: any) {
	return request({
		url: '/api/prescription/config/pzrw',
		method: 'post',
		data,
	});
}

//	缺少业务接口
//	缺少报损页面接口


