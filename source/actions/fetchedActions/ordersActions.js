import {
	API_URL,
	GET_ORDERS,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_FAILURE,
} from "../../utilities/constants";

const getOrders = () => ({ type: GET_ORDERS });
const getOrdersSuccess = (orders) => ({
	type: GET_ORDERS_SUCCESS,
	payload: orders,
});
const getOrdersFailure = () => ({ type: GET_ORDERS_FAILURE });

export function fetchOrders() {
	return async (dispatch) => {
		dispatch(getOrders());

		try {
			const response = await fetch(`${API_URL}/orders/`);
			const data = await response.json();

			dispatch(getOrdersSuccess(data));
		} catch (error) {
			dispatch(getOrdersFailure());
		}
	};
}
