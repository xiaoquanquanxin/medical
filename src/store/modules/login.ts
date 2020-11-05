//	用户信息
import {autoLogin} from '@/api/login';
import {getJwt, getLoginInfo, setJwt, setLoginInfo} from '@/utils/auth';
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	//	jwt
	jwt: string;
	//	登录信息
	loginInfo: any;
	//	是局域网
	isLocalAreaNetwork: boolean
}

const state: STATE = {
	jwt: getJwt(),
	loginInfo: getLoginInfo(),
	isLocalAreaNetwork: true,
};

const mutations = {
	SET_JWT: (state: STATE, jwt: string) => {
		state.jwt = jwt;
	},
	SET_LOGIN_INFO: (state: STATE, loginInfo: string) => {
		state.loginInfo = loginInfo;
	},
	SET_NETWORK_ENVIRONMENT: (state: STATE, isLocalAreaNetwork: boolean) => {
		state.isLocalAreaNetwork = isLocalAreaNetwork;
	},
};

const actions = {
	// 用户登录
	login({commit, state}: COMMIT_INTERFACE<STATE>, loginInfo: any) {
		const {username, password} = loginInfo;
		return new Promise((resolve, reject) => {
			autoLogin({
				password,
				username,
			}).then(response => {
				const {data} = response;
				const {userInfo, prefix, token} = data;
				const Auth = prefix + token;
				//	console.log(JSON.parse(JSON.stringify(userInfo)));
				commit('SET_JWT', Auth);
				commit('SET_LOGIN_INFO', userInfo);
				setJwt(Auth);
				setLoginInfo(userInfo)
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	},
	setNetworkEnvironment({commit}: COMMIT_INTERFACE<STATE>, isLocalAreaNetwork: boolean) {
		commit('SET_NETWORK_ENVIRONMENT', isLocalAreaNetwork)
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
