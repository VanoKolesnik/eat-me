import { FILTER_CUISINES_CHECKED, FILTER_CUISINES_UNCHECKED_ALL } from "../utilities/constants";

const filterCuisinesChecked = (checkedCuisines) => ({
	type: FILTER_CUISINES_CHECKED,
	payload: checkedCuisines,
});

const filterCuisinesUncheckedAll = () => ({
	type: FILTER_CUISINES_UNCHECKED_ALL,
	payload: [],
});

export function toggleCuisinesChecked(cuisineValue) {
	return (dispatch, getState) => {
		const checkedCuisines = [...getState().filterCuisines.checked];
		const checkedId = checkedCuisines.indexOf(cuisineValue);

		if (checkedId === -1) {
			checkedCuisines.push(cuisineValue);
		} else {
			checkedCuisines.splice(checkedId, 1);
		}

		dispatch(filterCuisinesChecked(checkedCuisines));
	};
}
export function uncheckedAllFilterCuisines() {
	return (dispatch) => {
		dispatch(filterCuisinesUncheckedAll());
	};
}
