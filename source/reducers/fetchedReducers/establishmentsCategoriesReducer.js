import {
	GET_ESTABLISHMENTS_CATEGORIES,
	GET_ESTABLISHMENTS_CATEGORIES_SUCCESS,
	GET_ESTABLISHMENTS_CATEGORIES_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	categories: [],
};

export default function establishmentsCategoriesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ESTABLISHMENTS_CATEGORIES:
			return { ...state, loading: true };
		case GET_ESTABLISHMENTS_CATEGORIES_SUCCESS:
			return { categories: action.payload, loading: false, hasErrors: false };
		case GET_ESTABLISHMENTS_CATEGORIES_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
