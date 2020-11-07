//	验证相关

/**
 * 与第一密码比较，用于确认密码
 * @param:passwordKey:string 密码的验证的key
 * */
export function compareToFirstPassword(passwordKey: string) {
	return (rule: any, value: string, callback: Function) => {
		//	@ts-ignore
		const form = this.form;
		if (!value || value !== form.getFieldValue(passwordKey)) {
			callback('确认密码不符');
		} else {
			callback();
		}
	}
}

/**
 * 验证手机号
 * */
export function isPhoneNumber(rule: any, value: string, callback: Function) {
	const reg = /^1[3456789]\d{9}$/;
	if (!value || !reg.test(value)) {
		callback('请输入正确手机号');
	} else {
		callback();
	}
}


/**
 * 身份证号
 * */
export function isIdCard(idCardValue: string) {
	const reg = /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/;
	return reg.test(idCardValue);
}

/**
 * 根据身份证号获取生日
 * */
export function getBirthByIdCard(idCardValue: string) {
	const birth = idCardValue.substring(6, 10) + "-" + idCardValue.substring(10, 12) + "-" + idCardValue.substring(12, 14);
	console.log(`根据身份证号获取生日${birth}`);
	return birth
}

/**
 * 根据身份证号获取年龄
 * */
export function getAgeByIdCard(idCardValue: string) {
	const myDate = new Date();
	const month = myDate.getMonth() + 1;
	const day = myDate.getDate();
	let age = myDate.getFullYear() - +idCardValue.substring(6, 10) - 1;
	if (+idCardValue.substring(10, 12) < month || +idCardValue.substring(10, 12) == month && +idCardValue.substring(12, 14) <= day) {
		age++;
	}
	console.log(`根据身份证号获取年龄${age}`);
	return age || 0;
}


/**
 * 根据身份证号获取性别
 * */
export function getSexByIdCard(idCardValue: string) {
	const sex = +idCardValue.substring(16, 17) % 2 == 0 ? 2 : 1;
	console.log(`根据身份证号获取性别:男1女2：${sex}`)
	return sex;
}
