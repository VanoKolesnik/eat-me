import {
	SELECTED_DISHES,
	ORDER_QUANTITY,
	SET_ORDER_DISHES,
	SET_ORDER_QUANTITY,
} from "../utilities/constants";

const initialState = {
	dishes:
		JSON.parse(localStorage.getItem(SELECTED_DISHES)) === null
			? []
			: JSON.parse(localStorage.getItem(SELECTED_DISHES)),
	quantity: JSON.parse(localStorage.getItem(ORDER_QUANTITY)),
};

export default function setOrderData(state = initialState, action) {
	switch (action.type) {
		case SET_ORDER_DISHES:
			return { ...state, dishes: action.payload };
		case SET_ORDER_QUANTITY:
			return { ...state, quantity: action.payload };
		default:
			return state;
	}
}
