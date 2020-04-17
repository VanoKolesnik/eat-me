import { FILTER_CUISINES_CHECKED, FILTER_CUISINES_UNCHECKED_ALL } from "../utilities/constants";

const initialState = {
	checked: [],
};

export default function filterCuisinesReducer(state = initialState, action) {
	switch (action.type) {
		case FILTER_CUISINES_CHECKED:
			return { checked: action.payload };
		case FILTER_CUISINES_UNCHECKED_ALL:
			return { checked: action.payload };
		default:
			return state;
	}
}
