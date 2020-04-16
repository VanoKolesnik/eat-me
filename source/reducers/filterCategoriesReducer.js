import {
	FILTER_CATEGORIES_GET,
	FILTER_CATEGORIES_CHECKED,
	FILTER_CATEGORIES_UNCHECKED_ALL,
} from "../utilities/constants";

const initialState = {
	checked: [],
};

export default function filterCategoriesReducer(state = initialState, action) {
	switch (action.type) {
		case FILTER_CATEGORIES_GET:
			return state;
		case FILTER_CATEGORIES_CHECKED:
			return { checked: action.payload };
		case FILTER_CATEGORIES_UNCHECKED_ALL:
			return { checked: action.payload };
		default:
			return state;
	}
}
