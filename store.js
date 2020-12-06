import { createStore } from "redux";
import reducer from "./reducers/index";
// import { loadState, saveState } from "./action/localstorage";
// const persistedState = loadState();
// // Lukoil
// // yo.i"y>.9z
// const store = createStore(reducer, persistedState);
// store.subscribe(() => {
// 	saveState(store.getState());
// });

const store = createStore(reducer);
export default store;
