import {
	GET_CUISINES,
	GET_CUISINES_SUCCESS,
	GET_CUISINES_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	cuisines: [],
};

export default function cuisinesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CUISINES:
			return { ...state, loading: true };
		case GET_CUISINES_SUCCESS:
			return { cuisines: action.payload, loading: false, hasErrors: false };
		case GET_CUISINES_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
