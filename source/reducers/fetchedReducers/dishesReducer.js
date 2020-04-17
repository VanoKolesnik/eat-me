import { GET_DISHES, GET_DISHES_SUCCESS, GET_DISHES_FAILURE } from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	dishes: [],
};

export default function dishesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_DISHES:
			return { ...state, loading: true };
		case GET_DISHES_SUCCESS:
			return { dishes: action.payload, loading: false, hasErrors: false };
		case GET_DISHES_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
