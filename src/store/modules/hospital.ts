//	医院管理
import {COMMIT_INTERFACE} from "@/store"

//	分类管理
interface STATE {
	//	渠道商id
	distributorsList: [];
}

const state: STATE = {
	//	渠道商id
	distributorsList: [],
}

const mutations = {
	SET_DISTRIBUTORS_LIST: (state: STATE, distributorsList: []) => {
		state.distributorsList = distributorsList;
	},
	SET_BRAND_ID: (state: STATE, brandId: number) => {
		//	state.brandId = brandId;
	},
	SET_MANUFACTURER_ID: (state: STATE, manufacturerId: number) => {
		//	state.manufacturerId = manufacturerId;
	},
}

const actions = {
	setDistributorsList: ({commit}: COMMIT_INTERFACE<STATE>, distributorsList: []) => {
		commit('SET_DISTRIBUTORS_LIST', distributorsList);
	},
	setBrandId: ({commit}: COMMIT_INTERFACE<STATE>, brandId: number) => {
		commit('SET_BRAND_ID', brandId);
	},
	setManufacturerId: ({commit}: COMMIT_INTERFACE<STATE>, manufacturerId: number) => {
		commit('SET_MANUFACTURER_ID', manufacturerId);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

