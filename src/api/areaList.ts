import request from "@/utils/request"
//	地址，地区
//	查询省份
export function requestProvince() {
	return request({
		url: '/api/area/list/1',
		method: 'get',
	});
}

//	查询市区、县城
export function requestCityByProvince(id: string | number) {
	return request({
		url: `/api/area/getParentList/${id}`,
		method: 'get',
	});
}

