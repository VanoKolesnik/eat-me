import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Checkbox, Button, Icon } from "semantic-ui-react";

import {
	filterCategoriesGet,
	filterCategoriesUncheckedAll,
	toggleCategoriesChecked,
} from "../actions/filterCategoriesActions";

const Loading = ({ loading }) => {
	if (loading) {
		return (
			<Menu.Item>
				<Icon loading name="sync alternate" />
			</Menu.Item>
		);
	}
	return null;
};
const HasErrors = ({ hasErrors, refreshData }) => {
	if (hasErrors) {
		return (
			<Menu.Item>
				<Button icon="redo alternate" circular onClick={refreshData} />
			</Menu.Item>
		);
	}
	return null;
};

const MenuItem = ({ menuItem, checkedItems, handleChecked }) => {
	return (
		<Menu.Item>
			<Menu.Header>{menuItem.title}</Menu.Header>

			<Menu.Menu>
				{menuItem.dataset.map((itemValue, key) => {
					let checked = false;
					checked = checkedItems.indexOf(itemValue.name) === -1 ? false : true;
					return (
						<Menu.Item key={key}>
							<Checkbox
								toggle
								label={itemValue.name}
								value={itemValue.name}
								name={itemValue.name}
								checked={checked}
								onChange={handleChecked}
							/>
						</Menu.Item>
					);
				})}
			</Menu.Menu>
		</Menu.Item>
	);
};

const SidebarFilter = ({ dispatch, menuItems, loading, hasErrors, refreshData, filterChecked }) => {
	useEffect(() => {
		dispatch(filterCategoriesGet());
	}, [dispatch]);

	const handleChecked = (event, data) => {
		dispatch(toggleCategoriesChecked(data.value));
	};

	return (
		<Menu vertical fluid>
			{loading ? (
				<Loading loading={loading} />
			) : hasErrors ? (
				<HasErrors hasErrors={hasErrors} refreshData={refreshData} />
			) : (
				menuItems.map((menuItem, key) => {
					return (
						<MenuItem
							menuItem={menuItem}
							checkedItems={filterChecked}
							handleChecked={handleChecked}
							key={key}
						/>
					);
				})
			)}
		</Menu>
	);
};

const mapStateToProps = (state) => {
	return {
		filterChecked: state.filterCategories.checked,
	};
};

export default connect(mapStateToProps)(SidebarFilter);
