import { ACCOUNT_ID, SET_ACCOUNT_ID, GET_ACCOUNT_ID } from "../utilities/constants";

const setAccountIdAction = (accountId) => ({
	type: SET_ACCOUNT_ID,
	payload: accountId,
});
const getAccountIdAction = () => ({
	type: GET_ACCOUNT_ID,
});
export const setAccountId = (accountId) => {
	return (dispatch) => {
		localStorage.setItem(ACCOUNT_ID, JSON.stringify(accountId));
		dispatch(setAccountIdAction(accountId));
	};
};
export const getAccountId = () => {
	return (dispatch) => {
		dispatch(setAccountIdAction(JSON.parse(localStorage.getItem(ACCOUNT_ID))));
		dispatch(getAccountIdAction());
	};
};
