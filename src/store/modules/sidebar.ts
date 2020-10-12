// 	控制slider

interface STATE {
	//	导航是否展开折叠
	collapsed: boolean;
}

const state: STATE = {
	//	导航是否展开折叠
	collapsed: false,
};

const mutations = {
	SET_COLLAPSED: (state: any, collapsed: boolean) => {
		state.collapsed = collapsed;
	},
};

const actions = {
	setCollapsed({commit}: { commit: Function }, collapsed: boolean) {
		commit('SET_COLLAPSED', collapsed);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
