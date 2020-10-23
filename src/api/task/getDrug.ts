import request from '@/utils/request';

//	领药分页			✅，⚠️接口文档请求参数和原型差挺多
export function requestPrescriptionConfigCfly(data: any) {
	return request({
		url: '/api/prescription/config/cfly',
		method: 'post',
		data,
	});
}

//	缺少业务接口


