import {
	FILTER_CATEGORIES_GET,
	FILTER_CATEGORIES_CHECKED,
	FILTER_CATEGORIES_UNCHECKED_ALL,
} from "../utilities/constants";

export const filterCategoriesGet = () => ({ type: FILTER_CATEGORIES_GET });

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
		let isExists = false;
		let checkedId = -1;

		checkedCategories.map((checkedCategory, id) => {
			if (checkedCategory === categoryValue) {
				isExists = true;
				checkedId = id;
			}
		});

		if (isExists) {
			checkedCategories.splice(checkedId, 1);
		} else {
			checkedCategories.push(categoryValue);
		}

		dispatch(filterCategoriesChecked(checkedCategories));
	};
}
