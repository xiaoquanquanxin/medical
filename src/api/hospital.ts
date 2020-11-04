import request, {unifiedHandlingList} from '@/utils/request';

//	医院管理列表、医院列表	✅
export function requestHospitalPage(data: any) {
	return request({
		url: '/api/hospital/page',
		method: 'post',
		data,
	});
}

//	新增医院				❌，404，传参和原型不同
export function requestHospitalSave(data: any) {
	return request({
		url: '/api/hospital/save',
		method: 'post',
		data,
	});
}

//	编辑医院
export function requestHospitalUpdate(data: any) {
	return request({
		url: '/api/hospital/update',
		method: 'post',
		data,
	});
}

//	删除医院
export function requestHospitalDelete(id: string | number) {
	return request({
		url: `/api/category/delete/${id}`,
		method: 'get',
	});
}


//	全部医院
export function requestHospitalGetList() {
	return request({
		url: '/api/hospital/getList',
		method: 'get',
	})
		.then(unifiedHandlingList)
}


//	获取医院信息
export function requestHospitalGet(id: string | number) {
	return request({
		url: `/api/hospital/get/${id}`,
		method: 'get',
	});
}

//	修改医院信息状态
export function requestHospitalChangeStatus(id: string | number) {
	return request({
		url: `/api/hospital/changeStatus/${id}`,
		method: 'get',
	})
}

//	获取已经关联的科室，根据id获取医院关联科室
export function requestDeptListDeptHospitalId(id: string | number) {
	return request({
		url: `/api/dept/listDeptHospitalId/${id}`,
		method: 'get',
	});
}

//	医院-关联科室保存
export function requestHospitalRelatedDepartments(data: {
	"hospitalId": number
	"deptIds": [],
}) {
	return request({
		url: '/api/hospital/relatedDepartments',
		method: 'post',
		data,
	});
}


//	根据医院id获取已经关联的渠道商
export function requestHospitalListChannelBusiness(id: string | number) {
	return request({
		url: `/api/hospital/listChannelBusiness/${id}`,
		method: 'get',
	})
		.then(v => {
			return v.data[0];
		})
}


//	医院-医院关联渠道商
export function requestHospitalHospitalRelationChannelBusiness(data: {
	"channelBusinessId": number
	"hospitalId": [],
}) {
	return request({
		url: '/api/hospital/hospitalRelationChannelBusiness',
		method: 'post',
		data,
	});
}






