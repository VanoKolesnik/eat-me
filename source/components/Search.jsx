import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Input } from "semantic-ui-react";

import { handleSearch, clearSearch } from "../actions/searchActions";

const Search = ({ dispatch, search, ...args }) => {
	useEffect(() => {
		dispatch(clearSearch());
	}, []);

	const handleSearchInput = (event, data) => {
		dispatch(handleSearch(data.value));
	};

	return (
		<Input
			placeholder="Пошук"
			icon="search"
			value={search.value}
			onChange={handleSearchInput}
			{...args}
		/>
	);
};

const mapStateToProps = (state) => ({
	search: state.search,
});

export default connect(mapStateToProps)(Search);
