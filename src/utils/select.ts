//  展开
export function dropdownVisibleChangeFn(value: boolean, no: number) {
	//	console.log(value, no);
	//	@ts-ignore
	this.selectSuffixIconMap[no] = value
}

export const selectSuffixIconMap = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
	7: false,
	8: false,
}