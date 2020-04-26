import { SET_ACCOUNT_ID, GET_ACCOUNT_ID } from "../utilities/constants";

const initialState = {
	id: null,
};

export default function setAccountId(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_ID:
			return { id: action.payload };
		case GET_ACCOUNT_ID:
			return state;
		default:
			return state;
	}
}
