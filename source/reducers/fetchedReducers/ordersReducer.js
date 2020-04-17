import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE } from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	orders: [],
};

export default function ordersReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ORDERS:
			return { ...state, loading: true };
		case GET_ORDERS_SUCCESS:
			return { orders: action.payload, loading: false, hasErrors: false };
		case GET_ORDERS_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
