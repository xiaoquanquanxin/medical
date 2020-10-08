//	医院管理
import {COMMIT_INTERFACE} from "@/store"

//	分类管理
interface STATE {
	//	渠道商id
	distributorsId: number;
}

const state: STATE = {
	//	渠道商id
	distributorsId: 0,
}

const mutations = {
	SET_DISTRIBUTORS_ID: (state: STATE, distributorsId: number) => {
		state.distributorsId = distributorsId;
	},
	SET_BRAND_ID: (state: STATE, brandId: number) => {
		//	state.brandId = brandId;
	},
	SET_MANUFACTURER_ID: (state: STATE, manufacturerId: number) => {
		//	state.manufacturerId = manufacturerId;
	},
}

const actions = {
	setDistributorsId: ({commit}: COMMIT_INTERFACE<STATE>, distributorsId: number) => {
		commit('SET_DISTRIBUTORS_ID', distributorsId);
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

