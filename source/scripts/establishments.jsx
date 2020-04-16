import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import Establishments from "../pages/Establishments";
import rootReducer from "../reducers";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
	<Provider store={store}>
		<Establishments />
	</Provider>,
	document.getElementById("app")
);
