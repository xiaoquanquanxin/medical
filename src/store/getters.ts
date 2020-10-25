const getters = {
	//	侧边栏
	sidebar: (state: any) => state.app.sidebar,
	//	路由
	routeList: (state: any) => state.app.routeList,
	//	左右框
	shuttleBox: (state: any) => state.app.shuttleBox,

	//	登录信息
	login: (state: any) => state.app.login,

	//	仓库管理
	entrepot: (state: any) => state.app.entrepot,
	//	渠道商管理
	distributors: (state: any) => state.app.distributors,
	//	家庭组
	familyGroup: (state: any) => state.app.familyGroup,
	//	患者用户
	patientsUser: (state: any) => state.app.patientsUser,
	//	商品管理
	commodity: (state: any) => state.app.commodity,

	//	处方模板管理
	prescriptionTemplate: (state: any) => state.app.prescriptionTemplate,
	//	库房管理
	warehouse: (state: any) => state.app.warehouse,

	//	系统管理
	system: (state: any) => state.app.system,

	//	🍎🍎🍎🍎🍎营养方案系统
	//	用户列表
	userList: (state: any) => state.app.userList,

	//	收计费
	cost: (state: any) => state.app.cost,

	//	主要是方案详情相关的
	detailsTable: (state: any) => state.app.detailsTable,

	addOral: (state: any) => state.app.addOral,

	intervention: (state: any) => state.app.intervention,
};
export default getters;
