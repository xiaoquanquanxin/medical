//  分页信息
interface Pagination {
	//	当前第几页
	current: number;
	//	每页多少个
	pageSize: number;
	//	总数
	total: number;
	pageSizeOptions?: any;
}

//	创建分页对象
export const paginationInit = (pageSize?: number): Pagination => {
	return {
		pageSizeOptions: ['10', '20', '30', '40', '50'],
		current: 1,
		pageSize: pageSize || 20,
		total: 0,
	};
}
export const pagination: Pagination = {
	pageSizeOptions: ['10', '20', '30', '40', '50'],
	current: 1,
	pageSize: 20,
	total: 0,
};


interface Params {
	//	当前第几页
	current: number;
	//	每页多少个
	size: number;
}

//	编辑分页
export const paginationEncode = (pagination: Pagination): Params => {
	return {
		size: pagination.pageSize,
		current: pagination.current,
	}
}

interface Response {
	total: number;
	size: number;
	current: number;
}

//	解析分页
export const paginationDecode = (
	originPagination: Pagination,
	pagination: Response
): Pagination => {
	return Object.assign(originPagination, {
		total: pagination.total,
		current: pagination.current,
		pageSize: pagination.size,
	})
}
