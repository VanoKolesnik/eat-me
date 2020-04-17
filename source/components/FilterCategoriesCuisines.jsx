import React from "react";
import { connect } from "react-redux";
import { Menu, Checkbox, Button, Icon, Header, Grid } from "semantic-ui-react";

import {
	toggleCategoriesChecked,
	uncheckedAllFilterCategories,
} from "../actions/filterCategoriesActions";
import {
	toggleCuisinesChecked,
	uncheckedAllFilterCuisines,
} from "../actions/filterCuisinesActions";

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
					if (menuItem.title === "Категорії") {
						checked = checkedItems[0].indexOf(itemValue.name) === -1 ? false : true;
					} else if (menuItem.title === "Кухні") {
						checked = checkedItems[1].indexOf(itemValue.name) === -1 ? false : true;
					}
					return (
						<Menu.Item key={key}>
							<Checkbox
								toggle
								label={itemValue.name}
								value={itemValue.name}
								name={menuItem.title}
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

const SidebarFilter = ({
	dispatch,
	menuItems,
	loading,
	hasErrors,
	refreshData,
	filterCategoriesChecked,
	filterCuisinesChecked,
}) => {
	const handleChecked = (event, data) => {
		const { name, value } = data;

		if (name === "Категорії") {
			dispatch(toggleCategoriesChecked(value));
		} else if (name === "Кухні") {
			dispatch(toggleCuisinesChecked(value));
		}
	};

	return (
		<Menu vertical fluid>
			<Menu.Item>
				<Grid columns={2} centered>
					<Grid.Column verticalAlign="middle">
						<Header as="h3">Фільтр</Header>
					</Grid.Column>
					<Grid.Column verticalAlign="middle">
						{loading ? <Loading loading={loading} /> : null}
					</Grid.Column>
				</Grid>
			</Menu.Item>

			{loading ? null : hasErrors ? (
				<Menu.Item>
					<Grid centered verticalAlign="middle">
						<HasErrors hasErrors={hasErrors} refreshData={refreshData} />
					</Grid>
				</Menu.Item>
			) : (
				menuItems.map((menuItem, key) => {
					return (
						<MenuItem
							menuItem={menuItem}
							checkedItems={[filterCategoriesChecked, filterCuisinesChecked]}
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
		filterCategoriesChecked: state.filterCategories.checked,
		filterCuisinesChecked: state.filterCuisines.checked,
	};
};

export default connect(mapStateToProps)(SidebarFilter);
