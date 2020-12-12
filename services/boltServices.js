import axios from "axios";

export default class BoltServices {
	_apiBase = "http://web1c.standart.by/std_UT/hs/api";

	getResource = async (url) => {
		try {
			const res = axios({
				url: `${this._apiBase}${url}`,
				auth: {
					username: "hs",
					password: "1qasw23ed!",
				},
			});
			return await res;
		} catch (e) {
			console.log(e);
		}
	};

	// выбор вариантов/размеров одного товара
	getItems = async (id, currentPage, countPage) => {
		const res = await this.getResource(
			`/Standart/${id}?offset=${currentPage}&count=${countPage}`
		);

		return res.data;
	};

	getFilterItems = async (
		standart,
		mat,
		cov,
		form,
		dimA,
		dimB,
		dimC,
		currentPage,
		countPage
	) => {
		const res = await this.getResource(
			`/Standart/${standart}?mat=${mat}&cov=${cov}&form=${form}&dimA=${dimA}&dimB=${dimB}&dimC=${dimC}&offset=${currentPage}&&count=${countPage}`
		);

		return res;
	};

	getCustomerInfo = async (id) => {
		const res = await this.getResource(`/CustomerInfo/${id}`);
		return res;
	};

	getCustomerOrders = async (
		id,
		currentPage,
		countPage,
		startData,
		endData
	) => {
		const res = await this.getResource(
			`/GetOrdersByClient/${id}?offset=${currentPage}&count=${countPage}${
				startData !== "" ? `&DateStart=${startData}` : ""
			}${endData !== "" ? `&DateEnd=${endData}` : ""}`
		);
		return res;
	};

	getCustomerOrdersInfo = async (id) => {
		const res = await this.getResource(`/GetOrderItems/${id}`);
		return res;
	};

	getCustomerContacts = async (id) => {
		const res = await this.getResource(`/GetClientInfo/${id}`);
		return res;
	};

	getCustomerEqualizations = async (
		id,
		currentPage,
		countPage,
		startData,
		endData
	) => {
		const res = await this.getResource(
			`/GetSalesByClient/${id}?offset=${currentPage}&count=${countPage}${
				startData !== "" ? `&DateStart=${startData}` : ""
			}${endData !== "" ? `&DateEnd=${endData}` : ""}`
		);
		return res;
	};

	getCustomerEqualizationsInfo = async (id) => {
		const res = await this.getResource(`/GetSalesItems/${id}`);
		return res;
	};

	getCustomerPayments = async (
		id,
		currentPage,
		countPage,
		startData,
		endData
	) => {
		const res = await this.getResource(
			`/GetPaymentByClient/${id}?offset=${currentPage}&count=${countPage}&DateStart=${startData}&DateEnd=${endData}`
		);
		return res;
	};

	getOrderInvoice = async (id) => {
		const res = await this.getResource(`/GetOrderInvoice/${id}`);

		return res;
	};

	getOrganization = async () => {
		const res = await this.getResource(`/GetOrganization`);
		return res;
	};

	getAllType = async () => {
		const res = await this.getResource(`/StandartsByType/1`);
		return res;
	};

	getAllTypesItem = async (id) => {
		const res = await this.getResource(`/StandartsByType/${id}`);

		return res;
	};

	// поиск
	getStandart = async (id) => {
		const res = await this.getResource(
			`/StandartsByType/c90c4463-394a-11e9-9fa8-00155d0e072e`
		);
	};

	getSearchItems = async (str) => {
		const res1 = await this.getResource(`/Search/${str}`);
		return await this._transformSearchArray(res1.data.ListOfTypes);
	};

	loginUser = async (login, pass) => {
		const res = await this.getResource(`/ClientLogin/${login}/${pass}`);

		return res;
	};

	checkLogin = async (login) => {
		const res = await this.getResource(`/CheckLogin/${login}`);
		return res;
	};

	newCustomer = async (obj) => {
		// const res = await this.getResource(`/NewCustomer/${str}`);
		// return res;

		axios({
			method: "post",
			url: `${this._apiBase}/NewCustomer`,
			auth: {
				username: "hs",
				password: "1qasw23ed!",
			},
			data: obj,
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	newCartOrder = async (obj) => {
		// const res = await this.getResource(`/NewCustomer/${str}`);
		// return res;
		axios({
			method: "post",
			url: `${this._apiBase}/Order`,
			auth: {
				username: "hs",
				password: "1qasw23ed!",
			},
			data: obj,
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	getFilters = async (id) => {
		const res = await this.getResource(`/Filters/${id}`);
		return res;
	};

	_transformSearchArray = (arr) => {
		return arr.map((item) => {
			if (item.Category_id === "c90c4463-394a-11e9-9fa8-00155d0e072e") {
				item.typeName = "screws";
			} else if (item.Category_id === "bd35f5e8-394a-11e9-9fa8-00155d0e072e") {
				item.typeName = "bolts";
			} else if (item.Category_id === "ac55ae62-394a-11e9-9fa8-00155d0e072e") {
				item.typeName = "anchors";
			} else if (item.Category_id === "2dd5ff8b-394b-11e9-9fa8-00155d0e072e") {
				item.typeName = "nuts";
			} else if (item.Category_id === "dbe38c4a-394a-11e9-9fa8-00155d0e072e") {
				item.typeName = "wares";
			} else if (item.Category_id === "06d29a2a-394b-11e9-9fa8-00155d0e072e") {
				item.typeName = "others_bolts";
			} else if (item.Category_id === "66784aac-577c-11e7-bc71-c4e98402e535") {
				item.typeName = "others_wares";
			} else if (item.Category_id === "912fc794-394a-11e9-9fa8-00155d0e072e") {
				item.typeName = "washers";
			} else if (item.Category_id === "145ad2fc-394b-11e9-9fa8-00155d0e072e") {
				item.typeName = "elements";
			} else {
				item.typeName = "others_wares";
			}

			return item;
		});
	};
}
