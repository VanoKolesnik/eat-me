import { SEARCH_CHANGED, SEARCH_CLEARED } from "../utilities/constants";

const initialState = {
	value: "",
};

export default function filterCuisinesReducer(state = initialState, action) {
	switch (action.type) {
		case SEARCH_CHANGED:
			return { ...state, value: action.payload };
		case SEARCH_CLEARED:
			return { ...state, value: "" };
		default:
			return state;
	}
}
