import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Segment, Tab, Image, Icon, Button } from "semantic-ui-react";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { fetchDishes } from "../actions/fetchedActions/dishesActions";
import { setOrderDishQuantity } from "../actions/orderActions";

import { ACCOUNT_ID } from "../utilities/constants";

const Dishes = ({ dispatch, dishes, dishesQuantity }) => {
	const handleAdditionQuantity = (id) => {
		dispatch(setOrderDishQuantity(id));
	};

	const handleSubstractionQuantity = (id, quantity) => {
		// todo
	};

	const handleRemoveQuantity = (id) => {
		// todo
	};

	return (
		<>
			{dishes.map((dish) =>
				dishesQuantity.map((dishQuantity) =>
					dish.id === dishQuantity.id ? (
						<Grid.Row key={dish.id}>
							<Grid columns={3}>
								<Grid.Column>
									<Image src={dish.image} sizy="mini" centered rounded />
								</Grid.Column>
								<Grid.Column>
									<Grid.Row>
										<h3>{dish.name}</h3>
									</Grid.Row>
									<Grid.Row>
										<Grid padded>
											<Grid.Row>
												<Icon name="globe" />
												<span>{dish.cuisine.name}</span>
											</Grid.Row>
											<Grid.Row>
												<Icon name="food" />
												<span>{dish.category.name}</span>
											</Grid.Row>

											<Grid.Row>Кіл-ть: {dishQuantity.quantity}</Grid.Row>
										</Grid>
									</Grid.Row>
								</Grid.Column>
								<Grid.Column>
									<Grid.Row>
										<Grid>
											<Grid.Row>
												Кіл-ть порцій: {dishQuantity.quantity}
											</Grid.Row>
											<Grid.Row>
												<Grid columns={2}>
													<Grid.Column>
														<Button
															icon
															onClick={() =>
																handleAdditionQuantity(dish.id)
															}
														>
															<Icon name="add" color="green" />
														</Button>
														<Button
															icon
															onClick={() =>
																handleSubstractionQuantity(dish.id)
															}
														>
															<Icon name="minus" color="yellow" />
														</Button>
													</Grid.Column>
													<Grid.Column>
														<Button
															icon
															onClick={() =>
																handleRemoveQuantity(dish.id)
															}
														>
															<Icon
																name="trash alternate"
																color="red"
															/>
														</Button>
													</Grid.Column>
												</Grid>
											</Grid.Row>
										</Grid>
									</Grid.Row>
								</Grid.Column>
							</Grid>
						</Grid.Row>
					) : null
				)
			)}
		</>
	);
};

const Order = ({
	dispatch,

	account,
	loadingAccount,
	hasErrorsAccount,

	dishes,
	loadingDishes,
	hasErrorsDishes,

	orderDishes,
	orderQuantity,
}) => {
	const [filteredDishes, setFilteredDishes] = useState([]);

	useEffect(() => {
		const accountId = localStorage.getItem(ACCOUNT_ID);

		if (accountId !== null) {
			dispatch(fetchAccounts(accountId));
		}
		dispatch(fetchDishes());
	}, [dispatch]);

	const filterDishes = (dishes) => {
		const filteredDishes = [];

		dishes.map((dish) => {
			orderDishes.map((orderDish) => {
				if (dish.id === orderDish.id)
					filteredDishes.push(Object.assign(dish, { quantity: orderDish.quantity }));
			});
		});

		return filteredDishes;
	};

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [dishes]);

	const panes = [
		{
			menuItem: "Зміст замовлення",
			render: () => (
				<Tab.Pane>
					<Grid>
						<Dishes
							dispatch={dispatch}
							dishes={filteredDishes}
							dishesQuantity={orderDishes}
						/>
					</Grid>
				</Tab.Pane>
			),
		},
		{ menuItem: "Дані акаунта", render: () => <Tab.Pane>account</Tab.Pane> },
		{ menuItem: "Підтвердження", render: () => <Tab.Pane>confirmation</Tab.Pane> },
	];

	return (
		<>
			<Header />

			<Grid padded>
				<Segment>
					<Tab panes={panes} />
				</Segment>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	account: state.accounts,
	loadingAccount: state.accounts.loading,
	hasErrorsAccount: state.accounts.hasErrors,

	dishes: state.dishes.dishes,
	loadingDishes: state.dishes.loading,
	hasErrorsDishes: state.dishes.hasErrors,

	orderDishes: state.order.dishes,
	orderQuantity: state.order.quantity,
});

export default connect(mapStateToProps)(Order);
