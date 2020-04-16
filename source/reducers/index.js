import { combineReducers } from "redux";

import categoriesReducer from "./categoriesReducer";
import cuisinesReducer from "./cuisinesReducer";
import filterCategoriesReducer from "./filterCategoriesReducer";

const rootReducer = combineReducers({
	// accounts: accountsReducer,
	// fastCustomers: fastCustomersReducer,
	categories: categoriesReducer,
	cuisines: cuisinesReducer,
	// establishments: establishmentsReducer,
	// dishes: dishesReducer,
	// orders: ordersReducer

	filterCategories: filterCategoriesReducer,
});

export default rootReducer;
