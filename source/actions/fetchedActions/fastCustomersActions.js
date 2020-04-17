import {
	API_URL,
	GET_FAST_CUSTOMERS,
	GET_FAST_CUSTOMERS_SUCCESS,
	GET_FAST_CUSTOMERS_FAILURE,
} from "../../utilities/constants";

const getFastCustomers = () => ({ type: GET_FAST_CUSTOMERS });
const getFastCustomersSuccess = (fastCustomers) => ({
	type: GET_FAST_CUSTOMERS_SUCCESS,
	payload: fastCustomers,
});
const getFastCustomersFailure = () => ({ type: GET_FAST_CUSTOMERS_FAILURE });

export function fetchFastCustomers() {
	return async (dispatch) => {
		dispatch(getFastCustomers());

		try {
			const response = await fetch(`${API_URL}/fast-customers/`);
			const data = await response.json();

			dispatch(getFastCustomersSuccess(data));
		} catch (error) {
			dispatch(getFastCustomersFailure());
		}
	};
}
