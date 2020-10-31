import request from '@/utils/request';

//	全部菜单					✅
export function requestMenuAllTree() {
	return request({
		url: '/api/menu/allTree',
		method: 'get',
	})
		.then(v => {
			const {data} = v;
			data.forEach((item: any, index: number) => {
				const {id, name, type} = item;
				item.title = name;
				item.key = id.toString();
				item.value = id.toString();
				//	console.log(JSON.parse(JSON.stringify(item)).type);
				//	console.log(type);
				item.typeText = (type === 0 ? '菜单' : '按钮');
				const {children} = item;
				if (!children.length) {
					delete item.children;
					return;
				}
				children.forEach((_item: any, _index: number) => {
					const {id, type} = _item;
					_item.key = id.toString();
					_item.value = id.toString();
					//	console.log(type);
					_item.typeText = (type === 0 ? '菜单' : '按钮');
					delete _item.children;
				});
			});
			return data;
		});
}

//	新增菜单					✅
export function requestMenuInsert(data: any) {
	return request({
		url: '/api/menu/insert',
		method: 'post',
		data,
	})
}

//	通过ID查询菜单的详细信息	✅
export function requestMenuGet(id: string) {
	return request({
		url: `/api/menu/get/${id}`,
		method: 'get',
	})
}

//	返回当前用户的树形菜单集合		❌等auth
export function requestMenuUserMenu() {
	return request({
		url: '/api/menu/userMenu',
		method: 'get',
	})
		.then(v => {
			const {data} = v;

		});
}

//	删除菜单
export function requestMenu(id: string) {
	return request({
		url: `/api/menu/${id}`,
		method: 'get',
	});
}


