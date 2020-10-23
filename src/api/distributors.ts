import request from '@/utils/request';

//	渠道商分页列表		✅，没有input功能
export function requestChannelBusinessPage(data: any) {
	return request({
		url: '/api/channelBusiness/page',
		method: 'post',
		data,
	});
}

//	新增渠道商		✅，⚠️需要修改字段
export function requestChannelBusinessInsert(data: any) {
	return request({
		url: '/api/channelBusiness/insert',
		method: 'post',
		data,
	});
}

//	查看仓库信息	❌
export function requestChannelBusinessGet(id: string | number) {
	return request({
		url: `/api/channelBusiness/get/${id}`,
		method: 'get',
	});
}

//	修改渠道商信息
export function requestChannelBusinessUpdate(data: any) {
	return request({
		url: '/api/channelBusiness/update',
		method: 'post',
		data,
	});
}

//	删除仓库信息
export function requestChannelBusinessDelete(id: string | number) {
	return request({
		url: `/api/channelBusiness/delete/${id}`,
		method: 'get',
	});
}


//	❌ 缺少 状态接口 1、开启：该渠道商可正常登录系统 2、关闭：该渠道商不可登录系统