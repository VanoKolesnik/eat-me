import { SEARCH_CHANGED, SEARCH_CLEARED } from "../utilities/constants";

const searchChanged = (value) => ({
	type: SEARCH_CHANGED,
	payload: value,
});
const searchCleared = () => ({ type: SEARCH_CLEARED });

export function handleSearch(searchValue) {
	return (dispatch) => {
		if (searchValue === undefined) {
			dispatch(searchChanged(""));
		} else {
			dispatch(searchChanged(searchValue));
		}
	};
}
export function clearSearch() {
	return (dispatch) => {
		dispatch(searchCleared());
	};
}
