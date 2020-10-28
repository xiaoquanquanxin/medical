import request from '@/utils/request';

//	病人列表分页		✅
export function requestPatientPage(data: any) {
	return request({
		url: '/api/patient/page',
		method: 'post',
		data,
	});
}

//	查询病人详细信息	✅，❌查询到的参数和原型不对应，这回导致修改病人失败，同样的，新增病人接口也是一样的参数，所以需要重新确定
//						对于查询：年龄不是生日，就诊科室没有数据，营养师没数据，病人状态；很多地方我看用的是字典的id?
//						对于保存：还有啥叫病区和劳动强度，虽然不影响保存接口，还有为什么得删除就诊病号才能成功[jzbh]，
export function requestPatientSelectOnePatient(patientId: string | number) {
	return request({
		url: `/api/patient/selectOnePatient/${patientId}`,
		method: 'get',
	});
}

//	病人修改			✅，❌接口可以通，但问题同上
export function requestPatientUpdate(data: any) {
	return request({
		url: '/api/patient/update',
		method: 'post',
		data,
	});
}

//	病人新增			✅，❌同上
export function requestPatientSave(data: any) {
	return request({
		url: '/api/patient/save',
		method: 'post',
		data,
	});
}

//	根据当前医院查询科室	 ❌
export function requestPatientSelectDeptByHospital() {
	return request({
		url: '/api/patient/selectDeptByHospital',
		method: 'get',
	});
}

//	根据当前医院查询所有医生	 ✅
export function requestPatientSelectDoctorByHospital(type: string | number) {
	//	type1 医生，type2，营养师
	return request({
		url: `/api/patient/selectDoctorByHospital/${type}`,
		method: 'get',
	});
}

//	id的格式不统一，联动存在隐患：doctorId是 1 还是 '1'，为什么要字符串'1'？但目前没问题

//	缺少确认出院、确认入院？我没找见

//	ICD诊断配置
export function requestPatientSelectICD() {
	return request({
		url: `/api/patient/selectICD`,
		method: 'get',
	});
}


interface PatientInfo {
	"address": "",
	"allergy": "",
	"bedCode": "",
	"birth": "",
	"bmi": "",
	"departTreatment": "",
	"doctorId": "",
	"family": "",
	"height": 0,
	"hospitalCode": "",
	"hospitalTreatment": "",
	"icd": "",
	"id": 0,
	"idCard": "",
	"idSocial": "",
	"name": "",
	"nation": "",
	"now": "",
	"nutritionistId": "",
	"past": "",
	"patientStatus": "",
	"phone": "15536325689",
	"professional": "",
	"treatCode": "",
	"weight": 75,
	"sex": 0,
}
