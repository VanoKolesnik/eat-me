import {
	GET_ESTABLISHMENTS,
	GET_ESTABLISHMENTS_SUCCESS,
	GET_ESTABLISHMENTS_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	establishments: [],
};

export default function establishmentsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ESTABLISHMENTS:
			return { ...state, loading: true };
		case GET_ESTABLISHMENTS_SUCCESS:
			return {
				establishments: action.payload,
				loading: false,
				hasErrors: false,
			};
		case GET_ESTABLISHMENTS_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
