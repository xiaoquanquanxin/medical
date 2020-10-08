//	穿梭框
import {COMMIT_INTERFACE} from "@/store"

//	穿梭框区分类型，每个用到穿梭框的都要有引入
export const SHUTTLE_BOX = {
	//	商品列表 - 授权
	DIALOG_AUTHORIZATION: 'DIALOG_AUTHORIZATION',
	//	医院管理 - 关联科室
	RELATED_DEPARTMENTS: 'RELATED_DEPARTMENTS',
	//	科室管理 - 关联疾病
	ASSOCIATED_DISEASE: 'ASSOCIATED_DISEASE',
	//	科室管理 - 关联评估调查表
	QUESTIONNAIRE: 'QUESTIONNAIRE',
};


interface STATE {
	modalTargetKeys: Array<any>;
	//	shuttleBoxBasicData: any;
	shuttleBoxType: string;
}

const state: STATE = {
	//	穿梭框的类型	🔥🔥🔥 类型非常重要，用于决定拉什么数据
	shuttleBoxType: '',
	//	穿梭框的基础数据
	//	shuttleBoxBasicData: null,
	//	穿梭框的数据
	modalTargetKeys: [],
}


const mutations = {
	SET_SHUTTLE_BOX_TYPE: (state: STATE, shuttleBoxType: string) => {
		state.shuttleBoxType = shuttleBoxType;
	},
	SET_MODAL_TARGET_KEY: (state: STATE, modalTargetKeys: Array<any>) => {
		state.modalTargetKeys = modalTargetKeys;
	},

}
//	'shuttleBox/setModalTargetKey'
const actions = {
	setShuttleBoxType({commit}: COMMIT_INTERFACE<STATE>, shuttleBoxType: string) {
		commit('SET_SHUTTLE_BOX_TYPE', shuttleBoxType)
	},
	setModalTargetKey({commit}: COMMIT_INTERFACE<STATE>, modalTargetKeys: Array<any>) {
		commit('SET_MODAL_TARGET_KEY', modalTargetKeys)
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
};
