import {
	API_URL,
	GET_ESTABLISHMENTS_CATEGORIES,
	GET_ESTABLISHMENTS_CATEGORIES_SUCCESS,
	GET_ESTABLISHMENTS_CATEGORIES_FAILURE,
} from "../../utilities/constants";

const getEstablishmentsCategories = () => ({ type: GET_ESTABLISHMENTS_CATEGORIES });
const getEstablishmentsCategoriesSuccess = (categories) => ({
	type: GET_ESTABLISHMENTS_CATEGORIES_SUCCESS,
	payload: categories,
});
const getEstablishmentsCategoriesFailure = () => ({ type: GET_ESTABLISHMENTS_CATEGORIES_FAILURE });

export function fetchEstablishmentsCategories() {
	return async (dispatch) => {
		dispatch(getEstablishmentsCategories());

		try {
			const response = await fetch(`${API_URL}/establishment-categories/`);
			const data = await response.json();

			dispatch(getEstablishmentsCategoriesSuccess(data));
		} catch (error) {
			dispatch(getEstablishmentsCategoriesFailure());
		}
	};
}
