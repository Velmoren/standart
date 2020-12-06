import "../styles/global.css";
import "../styles/datapicker.css";
import "../styles/sliderBlock.css";
import "../styles/map.css";
import "react-datepicker/dist/react-datepicker.css";

import { Provider } from "react-redux";
import store from "../store";
import lscache from "lscache";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const useAuth = () => {
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const acUpdateIsAuth = (obj) => {
		dispatch({
			type: "UPDATE_IS_AUTH",
			payload: obj,
		});
	};

	return { auth, acUpdateIsAuth };
};

const App = ({ Component, pageProps }) => {
	const [isInitial, setIsInitial] = useState(false);
	const [cookies, setCookie] = useCookies();

	// console.log(lscache.get("auth"));

	useEffect(() => {
		if (!isInitial) {
			if (lscache.get("search")) {
				store.dispatch({
					type: "UPDATE_IS_SEARCH",
					payload: lscache.get("search"),
				});
			}

			if (cookies.auth) {
				store.dispatch({
					type: "UPDATE_IS_AUTH",
					payload: cookies.auth,
				});
			}

			if (lscache.get("cart")) {
				store.dispatch({
					type: "UPDATE_IS_CART",
					payload: lscache.get("cart"),
				});
			}

			if (lscache.get("customer")) {
				store.dispatch({
					type: "UPDATE_IS_CUSTOMER",
					payload: lscache.get("customer"),
				});
			}

			if (lscache.get("news")) {
				store.dispatch({
					type: "UPDATE_NEWS",
					payload: lscache.get("news"),
				});
			}
		}
		setIsInitial(true);
	}, []);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default App;
