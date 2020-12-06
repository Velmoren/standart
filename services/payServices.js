import axios from "axios";

const apikey = "e23dd2e726734fdfa04536f96d638331";

export default class PayServices {
	_apiBase = `https://api.express-pay.by/v1/invoices?token=${apikey}`;

	getResource = async (url) => {
		try {
			const res = axios.post(
				`https://api.express-pay.by/v1/invoices?token=${apikey}`,
				{ AccountNo: 92, Amount: `3,15`, Currency: 933, ReturnInvoiceUrl: 1 }
			);
			return await res;
		} catch (e) {
			console.log(e);
		}
	};

	// выбор вариантов/размеров одного товара
	getInfo = async () => {
		const res = await this.getResource(``);
		return res.data;
	};

	getErip = async (num, sum, cur) => {
		try {
			const res = axios.post(
				`https://api.express-pay.by/v1/invoices?token=${apikey}`,
				{ AccountNo: num, Amount: sum, Currency: cur, ReturnInvoiceUrl: 1 }
			);
			return await res;
		} catch (e) {
			console.log(e);
		}
	};

	getCardPay = async (num, sum, cur, info) => {
		try {
			const res = axios.post(
				`https://cors-anywhere.herokuapp.com/https://api.express-pay.by/v1/cardinvoices?token=${apikey}`,
				{
					AccountNo: num,
					Amount: sum,
					Currency: cur,
					ReturnInvoiceUrl: 1,
					Info: info,
					ReturnUrl: "http://site.standart.by/",
					FailUrl: "http://site.standart.by/",
				}
			);
			return await res;
		} catch (e) {
			console.log(e);
		}
	};

	getCardPay2 = async (num, sum, cur, info) => {
		try {
			const res = axios.post(`https://api.express-pay.by/v1/web_invoices`, {
				ServiceId: 5735,
				AccountNo: num,
				Amount: sum,
				Currency: cur,
				Signature: "",
				ReturnType: "Json",
				ReturnUrl: "http://site.standart.by/",
				FailUrl: "http://site.standart.by/",
			});
			return await res;
		} catch (e) {
			console.log(e);
		}
	};

	getUrlFormPay = async (CardInvoiceNo) => {
		try {
			const res = axios.post(
				`https://api.express-pay.by/v1/cardinvoices/${CardInvoiceNo}/status?token=${apikey}`
			);
			return await res;
		} catch (e) {
			console.log(e);
		}
	};
}
