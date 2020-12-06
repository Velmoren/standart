import axios from "axios";

export default class PayServices {
	_apiBase = `https://geocode-maps.yandex.ru/1.x/?format=json&&apikey=30743603-2686-4016-9fe9-cd28f7e91923geocode=%27+`;

	getResource = async (url) => {
		try {
			const res = axios({
				url: `${this._apiBase}${url}`,
			});
			return await res;
		} catch (e) {
			console.log(e);
		}
	};

	// выбор вариантов/размеров одного товара
	getInfo = async () => {
		const res = await this.getResource(`Рос`);
		return res.data;
	};
}
