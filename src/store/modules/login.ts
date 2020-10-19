//	用户信息
import {login} from '@/api/login';
import {getJwt, getLoginInfo, setJwt, setLoginInfo} from '@/utils/auth';
import {COMMIT_INTERFACE} from "@/store"
//	@ts-ignore
import {decode} from 'jsonwebtoken';

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
	loginInfo: JSON.parse(getLoginInfo()),
	isLocalAreaNetwork: true,
};

const mutations = {
	SET_JWT: (state: STATE, jwt: string) => {
		state.jwt = jwt;
	},
	SET_LOGIN_INFO: (state: STATE, loginInfo: string) => {
		state.loginInfo = JSON.parse(loginInfo);
	},
	SET_NETWORK_ENVIRONMENT: (state: STATE, isLocalAreaNetwork: boolean) => {
		state.isLocalAreaNetwork = isLocalAreaNetwork;
	},
};

const actions = {
	// 用户登录
	login({commit, state}: COMMIT_INTERFACE<STATE>, loginInfo: any) {
		//	const {username, password} = loginInfo;
		return new Promise((resolve, reject) => {
			login({
				username: "sysadmin@hachismart.org",
				password: "sysadmin",
			}).then(response => {
				const {data} = response;
				//	console.log(data.token);
				const loginInfo = decode(data.token);
				console.table(loginInfo);
				commit('SET_JWT', data.token);
				commit('SET_LOGIN_INFO', loginInfo);
				setJwt(data.token);
				setLoginInfo(loginInfo)
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
