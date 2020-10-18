//  表格 设置横向或纵向滚动，也可用于指定滚动区域的宽和高

//	只有一排搜索
export const oneRowSearch = (columns: [{ width: number }], y: string) => {
	return {
		y: 'calc(100vh - 315px)',
		x: columns.reduce((a, b) => {
			return a + b.width;
		}, 0),
	}
}
//	有2排搜索按钮
export const twoRowSearch = (columns: [{ width: number }], y: string) => {
	return {
		y: 'calc(100vh - 357px)',
		x: columns.reduce((a, b) => {
			return a + b.width;
		}, 0),
	}
}
//	有3排搜索按钮
export const threeRowSearch = {x: 820, y: 'calc(100vh - 405px)'};


//	弹框table的scroll
export const modalTableScroll = {x: 750, y: 400};


//  表格 设置横向或纵向滚动，也可用于指定滚动区域的宽和高
//
// //	只有一排搜索
// export const oneRowSearch = (columns: [{ width: number }]) => {
// 	return fn(columns, 'calc(100vh - 300px)')
// }
//
// //	有2排搜索按钮
// export const twoRowSearch = (columns: [{ width: number }]) => {
// 	return fn(columns, 'calc(100vh - 340px)')
// }

const fn = (columns: [{ width: number }], y: string) => {
	return {
		x: columns.reduce((a, b) => {
			return a + b.width;
		}, 0),
		y,
	}
};
