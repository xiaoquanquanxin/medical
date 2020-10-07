//	家庭组相关
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	viewFamilyGroupId: number,
}

const state: STATE = {
	//	平台 - 用户管理 - 普通用户 - 查看家庭组id
	viewFamilyGroupId: 0,
};

const mutations = {
	SET_VIEW_FAMILY_GROUP_ID: (state: STATE, viewFamilyGroupId: number) => {
		state.viewFamilyGroupId = viewFamilyGroupId;
	},
}

const actions = {
	setViewFamilyGroupId: ({commit}: COMMIT_INTERFACE<STATE>, viewFamilyGroupId: number) => {
		commit('SET_VIEW_FAMILY_GROUP_ID', viewFamilyGroupId);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

