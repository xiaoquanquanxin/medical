import request from '@/utils/request';

//	反馈记录列表		❌
export function requestFeedbackPage(data: any) {
	return request({
		url: '/api/feedback/page',
		method: 'post',
		data,
	});
}

//	反馈记录新增		✅
export function requestFeedbackSave(data: any) {
	return request({
		url: '/api/feedback/save',
		method: 'post',
		data,
	});
}

//	反馈记录编辑、修改反馈记录
export function requestFeedbackUpdate(data: any) {
	return request({
		url: '/api/feedback/update',
		method: 'post',
		data,
	});
}

//	删除反馈		⚠️原型无
export function requestFeedbackDelete(id: string | number) {
	return request({
		url: `/api/feedback/delete/${id}`,
		method: 'post',
	});
}


//	缺少详情接口





