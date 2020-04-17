import { FILTER_CATEGORIES_CHECKED, FILTER_CATEGORIES_UNCHECKED_ALL } from "../utilities/constants";

const filterCategoriesChecked = (checkedCategories) => ({
	type: FILTER_CATEGORIES_CHECKED,
	payload: checkedCategories,
});

export const filterCategoriesUncheckedAll = () => ({
	type: FILTER_CATEGORIES_UNCHECKED_ALL,
	payload: [],
});

export function toggleCategoriesChecked(categoryValue) {
	return (dispatch, getState) => {
		const checkedCategories = [...getState().filterCategories.checked];
		let checkedId = checkedCategories.indexOf(categoryValue);

		if (checkedId === -1) {
			checkedCategories.push(categoryValue);
		} else {
			checkedCategories.splice(checkedId, 1);
		}

		dispatch(filterCategoriesChecked(checkedCategories));
	};
}
