//	阻止默认事件
export function preventDefault(e: Event) {
	e.preventDefault();
}

// 设置storage
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

//	浏览器信息
const browser = {
	versions: function () {
		const u = navigator.userAgent;
		return {//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
		};
	}(),
};
//	console.log(browser.versions);
//  是移动端
//	export const isMobile = (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad);

//	设备信息
export const platform = (() => {
	const agent = navigator.userAgent.toLowerCase();
	const mac = /macintosh|mac os x/i.test(navigator.userAgent);
	const win32 = agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
	const win64 = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0;
	const windows = win32 || win64;
	return {
		mac,
		win32,
		win64,
		windows,
	}
})();

//	获取时间
export function getDateObject(timeStamp?: number) {
	let date = timeStamp ? new Date(timeStamp) : new Date();
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		date: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
	}
}

//	根据出生计算年龄
export function calcAgeByBirth(birthYear: string | number): number {
	return Number(birthYear) - getDateObject().year;
}

//	获取页面title
export default function getPageTitle(meta: { chName: string }): string {
	return meta.chName;
}