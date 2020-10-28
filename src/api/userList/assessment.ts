import request from '@/utils/request';

//	营养评估分页		✅，这快不是下拉，是输入框，国庆开会说的，缺回显字段？接口文档和原型不一样
export function requestPatientAssessPage(data: any) {
	return request({
		url: '/api/patientAssess/page',
		method: 'post',
		data,
	});
}

//	营养评估表删除
export function requestPatientAssessDelete(assesId: string | number) {
	return request({
		url: `/api/patientAssess/delete/${assesId}`,
		method: 'post',
	});
}


//	一般营养评估表保存	❌403，auth问题？但是我写的是1。参数缺少选择日期，筛查人；assessId是什么；营养评估id是什么，参数还有汉字？
export function requestPatientAssessSaveYbpgb(data: any) {
	return request({
		url: 'api/patientAssess/saveYbpgb',
		method: 'post',
		data,
	});
}


//	微型营养评估表保存
export function requestPatientAssessSaveMna(data: any) {
	return request({
		url: '/api/patientAssess/saveMna',
		method: 'post',
		data,
	});
}


//	PG-SGA主观营养状况评估表保存
export function requestPatientAssessSavePgsga(data: any) {
	return request({
		url: '/api/patientAssess/savePgsga',
		method: 'post',
		data,
	});
}


//	根据评估表ID查看评估表详情
export function PatientAssessSelectAssesById(assesId: string | number) {
	return request({
		url: `/api/patientAssess/selectAssesById/${assesId}`,
		method: 'get',
	});
}


