//	渠道商管理
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	//	渠道商id
	channelId: number;
	// //	渠道商名称
	// channelName: string;
	// //	渠道商编码
	// channelCode: string;
	// //	渠道商地区-省份
	// province: number;
	// //	渠道商地区-市区
	// city: number;
	// //	选择仓库
	// warehouse: number;
	// //	登录账户
	// loginAccount: string;
	// //	登录密码
	// password: string;
	// //	确认密码
	// confirmPassword: string;
}

const state: STATE = {
	//	渠道商id
	channelId: 0,
	// //	渠道商名称
	// channelName: '',
	// //	渠道商编码
	// channelCode: '',
	// //	渠道商地区-省份
	// province: 0,
	// //	渠道商地区-市区
	// city: 0,
	// //	选择仓库
	// warehouse: 0,
	// //	登录账户
	// loginAccount: '',
	// //	登录密码
	// password: '',
	// //	确认密码
	// confirmPassword: '',
}
const mutations = {
	//	渠道商id
	SET_CHANNEL_Id: (state: STATE, channelId: number) => {
		state.channelId = channelId;
	},
	// //	渠道商名称
	// SET_CHANNEL_NAME: (state: STATE, channelName: string) => {
	// 	state.channelName = channelName;
	// },
	// //	渠道商编码
	// SET_CHANNEL_CODE: (state: STATE, channelCode: string) => {
	// 	state.channelCode = channelCode;
	// },
	// //	渠道商地区-省份
	// SET_PROVINCE: (state: STATE, province: number) => {
	// 	state.province = province;
	// },
	// //	渠道商地区-市区
	// SET_CITY: (state: STATE, city: number) => {
	// 	state.city = city;
	// },
	// //	选择仓库
	// SET_WAREHOUSE: (state: STATE, warehouse: number) => {
	// 	state.warehouse = warehouse;
	// },
	// //	登录账户
	// SET_LOGIN_ACCOUNT: (state: STATE, loginAccount: string) => {
	// 	state.loginAccount = loginAccount;
	// },
	// //	登录密码
	// SET_PASSWORD: (state: STATE, password: string) => {
	// 	state.password = password;
	// },
	// //	确认密码
	// SET_CONFIRM_PASSWORD: (state: STATE, confirmPassword: string) => {
	// 	state.confirmPassword = confirmPassword;
	// },
}

const actions = {
	//	渠道商id
	setChannelId: ({commit}: COMMIT_INTERFACE<STATE>, channelId: number) => {
		commit('SET_CHANNEL_Id', channelId);
	},
	// //	渠道商名称
	// setChannelName: ({commit}: COMMIT_INTERFACE<STATE>, channelName: string) => {
	// 	commit('SET_CHANNEL_NAME', channelName);
	// },
	// //	渠道商编码
	// setChannelCode: ({commit}: COMMIT_INTERFACE<STATE>, channelCode: string) => {
	// 	commit('SET_CHANNEL_CODE', channelCode);
	// },
	// //	渠道商地区-省份
	// setProvince: ({commit}: COMMIT_INTERFACE<STATE>, province: number) => {
	// 	commit('SET_PROVINCE', province);
	// },
	// //	渠道商地区-市区
	// setCity: ({commit}: COMMIT_INTERFACE<STATE>, city: number) => {
	// 	commit('SET_CITY', city);
	// },
	// //	选择仓库
	// setWarehouse: ({commit}: COMMIT_INTERFACE<STATE>, warehouse: number) => {
	// 	commit('SET_WAREHOUSE', warehouse);
	// },
	// //	登录账户
	// setLoginAccount: ({commit}: COMMIT_INTERFACE<STATE>, loginAccount: string) => {
	// 	commit('SET_LOGIN_ACCOUNT', loginAccount);
	// },
	// //	登录密码
	// setPassword: ({commit}: COMMIT_INTERFACE<STATE>, password: string) => {
	// 	commit('SET_PASSWORD', password);
	// },
	// //	确认密码
	// setConfirmPassword: ({commit}: COMMIT_INTERFACE<STATE>, confirmPassword: string) => {
	// 	commit('SET_CONFIRM_PASSWORD', confirmPassword);
	// },

}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
