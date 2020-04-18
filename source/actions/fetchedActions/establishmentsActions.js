import {
	API_URL,
	GET_ESTABLISHMENTS,
	GET_ESTABLISHMENTS_SUCCESS,
	GET_ESTABLISHMENTS_FAILURE,
} from "../../utilities/constants";

const getEstablishments = () => ({ type: GET_ESTABLISHMENTS });
const getEstablishmentsSuccess = (establishments) => ({
	type: GET_ESTABLISHMENTS_SUCCESS,
	payload: establishments,
});
const getEstablishmentsFailure = () => ({ type: GET_ESTABLISHMENTS_FAILURE });

export function fetchEstablishments(id) {
	return async (dispatch) => {
		dispatch(getEstablishments());

		try {
			const query =
				id === undefined ? `${API_URL}/establishments/` : `${API_URL}/establishment/${id}`;
			const response = await fetch(query);
			const data = await response.json();

			dispatch(getEstablishmentsSuccess(data));
		} catch (error) {
			dispatch(getEstablishmentsFailure());
		}
	};
}
