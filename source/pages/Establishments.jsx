import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";

import Header from "../components/Header";
import FilterCategoriesCuisines from "../components/FilterCategoriesCuisines";
import Search from "../components/Search";

import { fetchCategories } from "../actions/fetchedActions/categoriesActions";
import { fetchCuisines } from "../actions/fetchedActions/cuisinesActions";

const Establishments = ({
	dispatch,
	categories,
	loadingCategories,
	hasErrorsCategories,
	cuisines,
	loadingCuisines,
	hasErrorsCuisines,
}) => {
	const [filterData, setFilterData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasErrors, setHasErrors] = useState(false);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchCuisines());
	}, [dispatch]);

	useEffect(() => {
		setFilterData([
			{
				title: "Категорії",
				dataset: categories,
			},
			{
				title: "Кухні",
				dataset: cuisines,
			},
		]);
	}, [categories, cuisines]);

	useEffect(() => {
		if (loadingCategories && loadingCuisines) {
			setLoading(true);
		} else {
			setLoading(false);
		}

		if (hasErrorsCategories || hasErrorsCuisines) {
			setHasErrors(true);
		} else {
			setHasErrors(false);
		}
	}, [loadingCategories, loadingCuisines, hasErrorsCategories, hasErrorsCuisines]);

	const refreshData = () => {
		dispatch(fetchCategories());
		dispatch(fetchCuisines());
	};

	return (
		<>
			<Header inverted />
			<Grid divided padded>
				<Grid.Column className="test" mobile={16} tablet={5} computer={5}>
					<FilterCategoriesCuisines
						menuItems={filterData}
						loading={loading}
						hasErrors={hasErrors}
						refreshData={refreshData}
					/>
				</Grid.Column>
				<Grid.Column mobile={16} tablet={11} computer={11}>
					<Segment.Group>
						<Segment>
							<Search fluid />
						</Segment>
						<Segment.Group>establishments</Segment.Group>
					</Segment.Group>
				</Grid.Column>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	categories: state.categories.categories,
	loadingCategories: state.categories.loading,
	hasErrorsCategories: state.categories.hasErrors,

	cuisines: state.cuisines.cuisines,
	loadingCuisines: state.cuisines.loading,
	hasErrorsCuisines: state.cuisines.hasErrors,
});

export default connect(mapStateToProps)(Establishments);
