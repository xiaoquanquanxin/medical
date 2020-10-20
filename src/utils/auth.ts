import {getStorage, setStorage} from "@/utils/common"

const TOKEN = 'Authorization'
const USER_INFO = 'USER_INFO'

export function getJwt(): string {
	return getStorage(TOKEN) || '';
}

export function setJwt(token: string) {
	setStorage(TOKEN, token);
}

export function getLoginInfo(): string {
	return getStorage(USER_INFO) || '{}';
}

export function setLoginInfo(loginInfo: string) {
	setStorage(USER_INFO, JSON.stringify(loginInfo))
}