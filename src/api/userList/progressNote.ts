import request from '@/utils/request';

//	病程记录分页		✅，回现参数不对
export function requestDiseaseRecordPage(data: any) {
	return request({
		url: '/api/diseaseRecord/page',
		method: 'post',
		data,
	});
}


//	病程记录新增		✅，❓我怎么知道doctorId？登录人id？得先解析auth，院内院外现在区分吗？
export function requestDiseaseRecordSave(data: any) {
	return request({
		url: '/api/diseaseRecord/save',
		method: 'post',
		data,
	});
}

//	删除病程记录
export function requestDiseaseRecordDelete(id: string | number) {
	return request({
		url: `/api/diseaseRecord/delete/${id}`,
		method: 'post',
	});
}


//	缺少详情接口，虽然是莫泰框，虽然list里有，但也得有详情接口呀
