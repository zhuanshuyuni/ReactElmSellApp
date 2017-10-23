// 1469281964000

let formatterData = function(timeInterval) {
	let date = new Date(timeInterval);
	let y = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();

	return `${y}-${month}-${day} ${hour}:${minute}`;
}

let saveSellerToLocal = function(id, key, value) {

	let localSeller = window.localStorage.seller; // window.localStorage.getItem('seller')
	if (!localSeller) {
		localSeller = {};
		localSeller[id] = {};
	} else {
		localSeller = JSON.parse(localSeller);
		if (!localSeller[id]) {
			localSeller[id] = {};
		}
	}
	localSeller[id][key] = value;
	window.localStorage.seller = JSON.stringify(localSeller);
}

let loadSellerFromLocal = function(id, key, ref) {

	let localSeller = window.localStorage.seller;

	if (!localSeller) {
		return ref;
	}
	let oneInfo = JSON.parse(localSeller)[id];
	if (!oneInfo) {
		return ref;
	}
	let favtive = oneInfo[key];

	return favtive || ref;
}

export default formatterData;
export {
	saveSellerToLocal,
	loadSellerFromLocal
};