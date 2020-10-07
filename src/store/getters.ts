const getters = {
	//	侧边栏
	sidebar: (state: any) => state.app.sidebar,
	//	路由
	routeList: (state: any) => state.app.routeList,
	//	左右框
	shuttleBox: (state: any) => state.app.shuttleBox,
	roleBox: (state: any) => state.app.roleBox,

	//	渠道商管理
	distributors: (state: any) => state.app.distributors,
	//	家庭组
	familyGroup: (state: any) => state.app.familyGroup,



	accountBox: (state: any) => state.app.accountBox,
	addOral: (state: any) => state.app.addOral,
};
export default getters;
