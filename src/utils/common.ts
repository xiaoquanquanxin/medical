//	阻止默认事件
export function preventDefault(e: Event) {
	e.preventDefault();
}

export function getStorage(key: string) {
	return localStorage.getItem(key);
}

export function setStorage(key: string, value: any) {
	//	console.log('设置token：', key, value);
	return localStorage.setItem(key, value);
}

export function removeStorage(key: string) {
	localStorage.removeItem(key);
}

export function clearStorage() {
	localStorage.clear();
}
