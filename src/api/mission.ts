import request from '@/utils/request';

//  宣教列表
export function requestArticlePage(data: any) {
	return request({
		url: '/api/article/page',
		method: 'post',
		data,
	});
}

