import {
	API_URL,
	GET_DISHES,
	GET_DISHES_SUCCESS,
	GET_DISHES_FAILURE,
} from "../../utilities/constants";

const getDishes = () => ({ type: GET_DISHES });
const getDishesSuccess = (dishes) => ({
	type: GET_DISHES_SUCCESS,
	payload: dishes,
});
const getDishesFailure = () => ({ type: GET_DISHES_FAILURE });

export function fetchDishes() {
	return async (dispatch) => {
		dispatch(getDishes());

		try {
			const response = await fetch(`${API_URL}/dishes/`);
			const data = await response.json();

			dispatch(getDishesSuccess(data));
		} catch (error) {
			dispatch(getDishesFailure());
		}
	};
}
