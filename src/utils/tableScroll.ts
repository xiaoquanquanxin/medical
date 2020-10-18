//  表格 设置横向或纵向滚动，也可用于指定滚动区域的宽和高

//	只有一排搜索
export const oneRowSearch = fn('calc(100vh - 315px)');
//	有2排搜索按钮
export const twoRowSearch = fn('calc(100vh - 357px)')
//	有3排搜索按钮
export const threeRowSearch = fn('calc(100vh - 405px)');

//	弹框table的scroll
export const modalTableScroll = {x: 750, y: 400};

function fn(y: string) {
	return (columns: [{ width: number }]) => {
		return {
			x: columns.reduce((a, b) => {
				return a + b.width;
			}, 0),
			y,
		}
	}
}
