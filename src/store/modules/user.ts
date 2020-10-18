//	用户信息
import {login} from '@/api/login';
import {getToken, setToken} from '@/utils/auth';
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	token: string;
	name: string;
	avatar: string
	introduction: string
	roles: []
}

const state = {
	token: getToken(),
	name: '',
	avatar: '',
	introduction: '',
	roles: []
};

const mutations = {
	SET_TOKEN: (state: STATE, token: string) => {
		state.token = token;
	},
	SET_INTRODUCTION: (state: STATE, introduction: string) => {
		state.introduction = introduction;
	},
	SET_NAME: (state: STATE, name: string) => {
		state.name = name;
	},
	SET_AVATAR: (state: STATE, avatar: string) => {
		state.avatar = avatar;
	},
	SET_ROLES: (state: STATE, roles: []) => {
		state.roles = roles;
	}
};

const actions = {
	// 用户登录
	login({commit, state}: COMMIT_INTERFACE<STATE>, userInfo: any) {
		const {username, password} = userInfo;
		return new Promise((resolve, reject) => {
			login({username: username.trim(), password: password}).then(response => {
				const {data} = response;
				commit('SET_TOKEN', data.token);
				setToken(data.token);
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
