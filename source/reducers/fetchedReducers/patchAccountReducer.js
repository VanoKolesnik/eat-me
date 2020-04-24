import {
	PATCH_ACCOUNT,
	PATCH_ACCOUNT_SUCCESS,
	PATCH_ACCOUNT_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	response: "",
};

export default function ordersReducer(state = initialState, action) {
	switch (action.type) {
		case PATCH_ACCOUNT:
			return { ...state, loading: true };
		case PATCH_ACCOUNT_SUCCESS:
			return { response: action.payload, loading: false, hasErrors: false };
		case PATCH_ACCOUNT_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
