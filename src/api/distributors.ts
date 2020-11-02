import request, {unifiedHandlingList} from '@/utils/request';

//	渠道商分页列表		✅，⚠️input不好使，列表缺字段；
//						⚠️有些东西，前端没法处理，比如地址，如果返回id，前端不可能去查完了比对，太麻烦，所以region这个字段就可以
export function requestChannelBusinessPage(data: any) {
	return request({
		url: '/api/channelBusiness/page',
		method: 'post',
		data,
	});
}

//	新增渠道商		✅，⚠️需要仓库列表接口，先有的是分页的
export function requestChannelBusinessInsert(data: any) {
	return request({
		url: '/api/channelBusiness/insert',
		method: 'post',
		data,
	});
}

//	查看仓库信息		✅，⚠️缺参数
export function requestChannelBusinessGet(id: string | number) {
	return request({
		url: `/api/channelBusiness/get/${id}`,
		method: 'get',
	});
}

//	修改渠道商信息		✅
export function requestChannelBusinessUpdate(data: any) {
	return request({
		url: '/api/channelBusiness/update',
		method: 'post',
		data,
	});
}

//	修改渠道商状态		✅✅
export function requestChannelBusinessChangeStatus(id: string | number) {
	return request({
		url: `/api/channelBusiness/changeStatus/${id}`,
		method: 'get',
	})
}

//	删除仓库信息		⚠️原型无
export function requestChannelBusinessDelete(id: string | number) {
	return request({
		url: `/api/channelBusiness/delete/${id}`,
		method: 'get',
	});
}

//	渠道商列表
export function requestChannelBusinessList() {
	return request({
		url: '/api/channelBusiness/list',
		method: 'get',
	})
		.then(unifiedHandlingList)
}
