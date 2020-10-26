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
	//	原始数据
	originList: [];
	//	被选中的数据
	selectList: [];
	//	shuttleBoxBasicData: any;
	shuttleBoxType: string;
}

const state: STATE = {
	//	穿梭框的类型	🔥🔥🔥 类型非常重要，用于决定拉什么数据
	shuttleBoxType: '',
	//	穿梭框的基础数据
	//	shuttleBoxBasicData: null,

	//	原始数据
	originList: [],
	//	被选中的数据
	selectList: []
}


const mutations = {
	SET_SHUTTLE_BOX_TYPE: (state: STATE, shuttleBoxType: string) => {
		state.shuttleBoxType = shuttleBoxType;
	},
	SET_ORIGIN_LIST: (state: STATE, originList: []) => {
		state.originList = originList;
	},
	SET_SELECT_LIST: (state: STATE, selectList: []) => {
		state.selectList = selectList;
	},

}
//	'shuttleBox/setModalTargetKey'
const actions = {
	setShuttleBoxType({commit}: COMMIT_INTERFACE<STATE>, shuttleBoxType: string) {
		commit('SET_SHUTTLE_BOX_TYPE', shuttleBoxType)
	},
	//	设置原始数据
	setOriginList({commit}: COMMIT_INTERFACE<STATE>, originList: []) {
		commit('SET_ORIGIN_LIST', originList)
	},
	//	设置被选中的数据
	setSelectList({commit}: COMMIT_INTERFACE<STATE>, selectList: []) {
		commit('SET_SELECT_LIST', selectList)
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
};
