import {
	GET_ACCOUNTS,
	GET_ACCOUNTS_SUCCESS,
	GET_ACCOUNTS_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	accounts: [],
};

export default function accountsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ACCOUNTS:
			return { ...state, loading: true };
		case GET_ACCOUNTS_SUCCESS:
			return { accounts: action.payload, loading: false, hasErrors: false };
		case GET_ACCOUNTS_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
