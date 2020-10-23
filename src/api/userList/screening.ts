import request from '@/utils/request';

//	营养筛查分页			✅
export function requestScreenPage(data: any) {
	return request({
		url: '/api/screen/page',
		method: 'post',
		data,
	});
}

//	根据ID查询营养筛查表	✅
export function requestScreenSelectOne(screenId: string | number) {
	return request({
		url: `/api/screen/selectOne/${screenId}`,
		method: 'post',
	});
}

//	营养筛查新增			✅，⚠️筛查人和时间？
export function requestScreenSave(data: any) {
	return request({
		url: '/api/screen/save',
		method: 'post',
		data,
	});
}

//	删除营养筛查		⚠️原型无
export function requestBriefDelete(screenId: string | number) {
	return request({
		url: `/api/screen/delete/${screenId}`,
		method: 'post',
	});
}



