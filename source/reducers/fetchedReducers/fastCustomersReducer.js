import {
	GET_FAST_CUSTOMERS,
	GET_FAST_CUSTOMERS_SUCCESS,
	GET_FAST_CUSTOMERS_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	fastCustomers: [],
};

export default function fastCustomersReducer(state = initialState, action) {
	switch (action.type) {
		case GET_FAST_CUSTOMERS:
			return { ...state, loading: true };
		case GET_FAST_CUSTOMERS_SUCCESS:
			return {
				fastCustomers: action.payload,
				loading: false,
				hasErrors: false,
			};
		case GET_FAST_CUSTOMERS_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
