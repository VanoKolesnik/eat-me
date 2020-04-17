import {
	API_URL,
	GET_ACCOUNTS,
	GET_ACCOUNTS_SUCCESS,
	GET_ACCOUNTS_FAILURE,
} from "../../utilities/constants";

const getAccounts = () => ({ type: GET_ACCOUNTS });
const getAccountsSuccess = (accounts) => ({
	type: GET_ACCOUNTS_SUCCESS,
	payload: accounts,
});
const getAccountsFailure = () => ({ type: GET_ACCOUNTS_FAILURE });

export function fetchAccounts(id) {
	return async (dispatch) => {
		dispatch(getAccounts());

		try {
			const query = id === undefined ? `${API_URL}/accounts/` : `${API_URL}/account/${id}`;
			const response = await fetch(query);
			const data = await response.json();

			dispatch(getAccountsSuccess(data));
		} catch (error) {
			dispatch(getAccountsFailure());
		}
	};
}
