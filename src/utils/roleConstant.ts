//	角色分类

//	1.临床医生
export const roleType1 = {
	// 	用户列表
	'userList': true,
	//	病人信息
	'patientInfo': true,
	//	筛查
	'screening': true,
	//	营养评估
	'assessment': true,
	//	营养干预
	'intervention': true,
	//	病程记录
	'progressNote': true,
	//	患者反馈
	'patientReply': true,
	//	活动小结
	'activityBrief': true,

	//	确认入院
	'admittedHospital': true,
	//	新增入院
	'addAdmittedHospital': true,

	//	新增筛查
	'addScreening': true,
	//	筛查详情
	'screeningDetail': true,

	//	新增营养评估
	'addAssessment': true,
	//	营养评估详情
	'assessmentDetail': true,

	//	营养营养干预详情
	'interventionDetail': true,
	//	新增营养干预
	'addIntervention': true,
	//	编辑营养干预
	'editIntervention': true,


	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,
};
//	2.渠道商
export const roleType2 = {
	//  商品查看
	'viewGoods': true,
	//	库房管理
	'warehouse': true,
	//	商品库存
	'inventory': true,
	//	医院采购订单
	'purchaseOrder': true,
	//	医院退货订单
	'salesReturnOrder': true,
	//	出库
	'outbound': true,
	//	入库
	'putInStorage': true,
	//	报损
	'reportedLoss': true,
	//	采购单管理
	'purchaseList': true,
	//	出货退货单
	'shipmentReturn': true,
	//  医生管理
	'doctor': true,

	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,

	//	订单管理
	'order': true,
	//	订单详情
	'orderDetail': true,
};
//	3.营养科主任
export const roleType3 = {
	// 	用户列表
	'userList': true,
	//	病人信息
	'patientInfo': true,
	//	筛查
	'screening': true,
	//	营养评估
	'assessment': true,
	//	营养干预
	'intervention': true,
	//	病程记录
	'progressNote': true,
	//	患者反馈
	'patientReply': true,
	//	活动小结
	'activityBrief': true,

	//	确认入院
	'admittedHospital': true,
	//	新增入院
	'addAdmittedHospital': true,

	//	新增筛查
	'addScreening': true,
	//	筛查详情
	'screeningDetail': true,

	//	新增营养评估
	'addAssessment': true,
	//	营养评估详情
	'assessmentDetail': true,

	//	营养营养干预详情
	'interventionDetail': true,
	//	新增营养干预
	'addIntervention': true,
	//	编辑营养干预
	'editIntervention': true,

	//	处方审核列表
	'auditList': true,
	//	处方审核详情
	'auditDetail': true,

	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,

	//	配置任务
	'task': true,
	//	配置任务
	'configuration': true,
	//	配置任务详情
	'configurationDetail': true,
};
//	8.主任	⚠️主任===营养科主任
export const roleType8 = roleType3;
//	4.系统管理员
export const roleType4 = {
	//	供应商管理
	'supplier': true,
	//	新增供应商
	'addSupplier': true,
	//	编辑供应商
	'editSupplier': true,
	//	渠道商管理
	'distributors': true,
	//  医院管理
	'hospital': true,
	//  新增医院
	'addHospital': true,
	//	编辑医院
	'editHospital': true,
	//  科室管理
	'department': true,
	//  新增科室
	'addDepartment': true,
	//  编辑科室
	'editDepartment': true,
	//  疾病管理
	'disease': true,
	//  新增疾病
	'addDisease': true,
	//  编辑疾病
	'editDisease': true,
	//	评估调查表管理
	'questionnaire': true,
	//	新增评估调查表
	'addQuestionnaire': true,
	//	编辑评估调查表
	'editQuestionnaire': true,
	//  商品管理
	'commodity': true,
	//	商品列表
	'commodityList': true,
	//  添加商品
	'addCommodity': true,
	//  编辑商品
	'editCommodity': true,
	//  处方模板管理
	'scheme': true,
	//	口服肠内营养补充
	'oral': true,
	//	新增口服肠内营养补充
	'addOral': true,
	//	编辑口服肠内营养补充
	'editOral': true,
	//	肠内营养支持
	'intestinal': true,
	//	新增肠内营养支持
	'addIntestinal': true,
	//	编辑肠内营养支持
	'editIntestinal': true,
	//	膳食营养计划
	'dietary': true,
	//	新增
	'addDietary': true,
	//	编辑
	'editDietary': true,
	//	用户管理【平台用户】
	'platformUser': true,
	//	普通用户
	'ordinaryUser': true,
	//	患者用户
	'patientsUser': true,
	//	仓库管理
	'entrepot': true,
	//  医生管理
	'doctor': true,
	//  新增医生
	'addDoctor': true,
	//  编辑医生
	'editDoctor': true,

	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,
	//  角色管理
	'role': true,
	//  账号管理
	'account': true,

	//	订单管理
	'order': true,
	//	订单详情
	'orderDetail': true,
};
//	5.配置室
export const roleType5 = {
	//	配置任务
	'task': true,
	//	配置任务
	'configuration': true,
	//	配置任务详情
	'configurationDetail': true,
	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,
};
//	6.收费科
export const roleType6 = {
	//	收计费
	'cost': true,
	//	收计费
	'costList': true,
	//	退费记录
	'returnPremium': true,
	//	缴费记录
	'paymentRecords': true,
	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,
};
//	7.财务总务科
export const roleType7 = {
	//	日结、月结
	'statement': true,
	//	月结
	'monthly': true,
	//	日结
	'daily': true,
	//	月结详情
	'monthlyDetail': true,
	//	日结详情
	'dailyDetail': true,
	//	执行月结
	'monthlyExecute': true,
	//	执行日结
	'dailyExecute': true,
	//  系统管理
	'system': true,
	//  修改密码
	'changePassword': true,
};