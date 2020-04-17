import { combineReducers } from "redux";

import categoriesReducer from "./fetchedReducers/categoriesReducer";
import cuisinesReducer from "./fetchedReducers/cuisinesReducer";
import establishmentsReducer from "./fetchedReducers/establishmentsReducer";
import accountsReducer from "./fetchedReducers/accountsReducer";
import fastCustomersReducer from "./fetchedReducers/fastCustomersReducer";
import dishesReducer from "./fetchedReducers/dishesReducer";
import ordersReduce from "./fetchedReducers/ordersReduce";

import searchReducer from "./searchReducer";
import filterCategoriesReducer from "./filterCategoriesReducer";
import filterCuisinesReducer from "./filterCuisinesReducer";

const rootReducer = combineReducers({
	categories: categoriesReducer,
	cuisines: cuisinesReducer,
	establishments: establishmentsReducer,
	accounts: accountsReducer,
	fastCustomers: fastCustomersReducer,
	dishes: dishesReducer,
	orders: ordersReduce,

	search: searchReducer,
	filterCategories: filterCategoriesReducer,
	filterCuisines: filterCuisinesReducer,
});

export default rootReducer;
