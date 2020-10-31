import request from '@/utils/request';

//	全部菜单			✅
export function requestMenuAllTree() {
	return request({
		url: '/api/menu/allTree',
		method: 'get',
	})
		.then(v => {
			const {data} = v;
			data.forEach((item: any, index: number) => {
				item.key = item.id.toString();
				item.value = item.id;
				item.title = item.name;
				const {children} = item;
				children.forEach((_item: any, _index: number) => {
					_item.key = `${item.id}-${_item.id}`;
					_item.value = _item.id;
					console.log(_item.key);
					//  筛掉自页面的路由
					if (!_item.children) {
						return;
					}
					if (!_item.children.length) {
						delete _item.children;
					}
				});
			});
			return data
		});
}

//	新增菜单
export function requestMenu() {
	return request({
		url: '/api/menu',
		method: 'get',
	})
}

//	通过ID查询菜单的详细信息
export function requestMenuDetail(id: string) {
	return request({
		url: `/api/menu/${id}`,
		method: 'get',
	})
}


