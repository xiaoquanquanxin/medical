import request from '@/utils/request';

//	病人列表分页		✅，年龄我计算？不行，要输入的是年龄不是生日； BML，是L，不是I
export function requestPatientPage(data: any) {
	return request({
		url: '/api/patient/page',
		method: 'post',
		data,
	});
}

//	病人新增			❌404
export function requestPatientSave(data: any) {
	return request({
		url: '/api/patient/save',
		method: 'post',
		data,
	});
}

//	查询病人详细信息	✅
export function requestPatientSelectOnePatient(patientId: string | number) {
	return request({
		url: `/api/patient/selectOnePatient/${patientId}`,
		method: 'post',
	});
}

//	病人修改			❌404
export function requestPatientUpdate(data: any) {
	return request({
		url: '/api/patient/update',
		method: 'post',
		data,
	});
}


//	根据当前医院查询科室	 ✅
export function requestPatientSelectDeptByHospital() {
	return request({
		url: '/api/patient/selectDeptByHospital',
		method: 'get',
	});
}

//	根据当前医院查询所有医生	 ✅
export function requestPatientSelectDoctorByHospital() {
	return request({
		url: '/api/patient/selectDoctorByHospital',
		method: 'get',
	});
}

//	id的格式不统一，联动存在隐患：doctorId是 1 还是 '1'，为什么要字符串'1'？



