import request from "@/utils/request"
//	地址，地区
//	查询省份
export function requestProvince() {
	return request({
		url: '/api/list/1',
		method: 'post',
	});
}

//	查询市区、县城
export function requestCityByProvince(id: string | number) {
	return request({
		url: `/api/getParentList/${id}`,
		method: 'post',
	});
}