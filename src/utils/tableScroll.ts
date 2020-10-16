//  表格 设置横向或纵向滚动，也可用于指定滚动区域的宽和高

//	只有一排搜索
export const oneRowSearch = {x: 820, y: 'calc(100vh - 300px)'};
//	有2排搜索按钮
export const towRowSearch = {x: 820, y: 'calc(100vh - 340px)'};


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
// export const towRowSearch = (columns: [{ width: number }]) => {
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
