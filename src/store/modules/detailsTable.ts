//	主要是方案详情相关的
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	基础信息数据
	basicInfoDetail: any;

	//	口服信息数据
	oralDetail: any;
	//	肠内信息数据
	intestinesDetail: any;

	//	能量表数据
	energyDetail: any;
}

//	有id，就是编辑了
const state: STATE = {
	basicInfoDetail: [],
	oralDetail: [],
	intestinesDetail: [],
	energyDetail: [],
}
const mutations = {
	SET_BASIC_INFO_DETAIL: (state: STATE, basicInfoDetail: any) => {
		state.basicInfoDetail = basicInfoDetail;
	},
	SET_ORAL_DETAIL: (state: STATE, oralDetail: any) => {
		state.oralDetail = oralDetail;
	},
	SET_INTESTINES_DETAIL: (state: STATE, intestinesDetail: any) => {
		state.intestinesDetail = intestinesDetail;
	},
	SET_ENERGY_DETAIL: (state: STATE, energyDetail: any) => {
		state.energyDetail = energyDetail;
	},
}

const actions = {
	setBasicInfoDetail: ({commit}: COMMIT_INTERFACE<STATE>, basicInfoDetail: any) => {
		commit('SET_BASIC_INFO_DETAIL', basicInfoDetail);
	},
	setOralDetail: ({commit}: COMMIT_INTERFACE<STATE>, oralDetail: any) => {
		commit('SET_ORAL_DETAIL', oralDetail);
	},
	setIntestinesDetail: ({commit}: COMMIT_INTERFACE<STATE>, intestinesDetail: any) => {
		commit('SET_INTESTINES_DETAIL', intestinesDetail);
	},
	setEnergyDetail: ({commit}: COMMIT_INTERFACE<STATE>, energyDetail: any) => {
		commit('SET_ENERGY_DETAIL', energyDetail);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
