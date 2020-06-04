import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import OrderPrint from "../pages/OrderPrint";
import rootReducer from "../reducers";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

render(
	<Provider store={store}>
		<OrderPrint />
	</Provider>,
	document.getElementById("app")
);
