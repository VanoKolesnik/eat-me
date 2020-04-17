import {
	API_URL,
	GET_CUISINES,
	GET_CUISINES_SUCCESS,
	GET_CUISINES_FAILURE,
} from "../../utilities/constants";

const getCuisines = () => ({ type: GET_CUISINES });
const getCuisinesSuccess = (cuisines) => ({
	type: GET_CUISINES_SUCCESS,
	payload: cuisines,
});
const getCuisinesFailure = () => ({ type: GET_CUISINES_FAILURE });

export function fetchCuisines() {
	return async (dispatch) => {
		dispatch(getCuisines());

		try {
			const response = await fetch(`${API_URL}/cuisines/`);
			const data = await response.json();

			dispatch(getCuisinesSuccess(data));
		} catch (error) {
			dispatch(getCuisinesFailure());
		}
	};
}
