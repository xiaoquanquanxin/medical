import request from "@/utils/request"

//	活动小结列表		✅
export function requestBriefPage(data: any) {
	return request({
		url: '/api/brief/page',
		method: 'post',
		data,
	});
}

//	活动记录新增		✅
export function requestBriefSave(data: any) {
	return request({
		url: '/api/brief/save',
		method: 'post',
		data,
	});
}

//	活动小结详情		✅
export function requestBriefGet(id: string | number) {
	return request({
		url: `/api/brief/getById/${id}`,
		method: 'get',
	});
}


//	活动记录编辑、修改活动记录 ⚠️原型无
export function requestBriefUpdate(data: any) {
	return request({
		url: '/api/brief/update',
		method: 'post',
		data,
	});
}

//	删除活动小结		⚠️原型无
export function requestBriefDelete(id: string | number) {
	return request({
		url: `/api/brief/delete/${id}`,
		method: 'get',
	});
}



