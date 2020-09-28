export const log = (data: Object) => {
	console.log(toJSON(data));
}
export const table = (data: Object) => {
	console.table(toJSON(data));
}
const toJSON = (data: Object) => {
	return JSON.parse(JSON.stringify(data))
}