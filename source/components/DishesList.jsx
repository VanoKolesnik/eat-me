import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Accordion, Grid, Image, Icon, Button } from "semantic-ui-react";

import { setOrderDish, setOrderQuantity } from "../actions/orderActions";

const DishesList = ({
	dishes,

	dispatch,

	search,
	orderQuantity,
	filterCategoriesChecked,
	filterCuisinesChecked,
}) => {
	const [filteredDishes, setFilteredDishes] = useState([]);
	const [activeDescriptionIndex, setActiveDescriptionIndex] = useState(-1);

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [dishes]);

	useEffect(() => {
		dispatch(setOrderQuantity(orderQuantity));
	}, [orderQuantity]);

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [filterCategoriesChecked, filterCuisinesChecked]);

	const isValid = (dish) => {
		let searchValid = false;
		let categoriesValid = false;
		let cuisinesValid = false;

		if (search.length) {
			if (dish.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
				searchValid = true;
			}
		} else {
			searchValid = true;
		}

		if (filterCategoriesChecked.length) {
			if (filterCategoriesChecked.indexOf(dish.category.name) !== -1) categoriesValid = true;
		} else {
			categoriesValid = true;
		}

		if (filterCuisinesChecked.length) {
			if (filterCuisinesChecked.indexOf(dish.cuisine.name) !== -1) cuisinesValid = true;
		} else {
			cuisinesValid = true;
		}

		return searchValid && categoriesValid && cuisinesValid;
	};

	const filterDishes = (dishes = []) => {
		let filteredDishes = [];

		dishes.map((dish) => {
			if (true) filteredDishes.push(dish);
		});

		return filteredDishes;
	};

	const handleDish = (dishId) => {
		dispatch(setOrderDish(dishId));
	};

	return (
		<>
			<Card.Group stackable centered>
				{}
				{filteredDishes.map((dish) =>
					isValid(dish) ? (
						<Card key={dish.id}>
							<Image src={dish.image} centered rounded />
							<Card.Content>
								<Card.Header>{dish.name}</Card.Header>
							</Card.Content>
							{dish.composition === "" ? null : (
								<Card.Content extra>
									<Accordion>
										<Accordion.Title
											active={activeDescriptionIndex === dish.id}
											index={dish.id}
											onClick={() => {
												activeDescriptionIndex === dish.id
													? setActiveDescriptionIndex(-1)
													: setActiveDescriptionIndex(dish.id);
											}}
										>
											<Icon name="dropdown" />
											Вміст
										</Accordion.Title>
										<Accordion.Content
											active={activeDescriptionIndex === dish.id}
										>
											<p>{dish.composition}</p>
										</Accordion.Content>
									</Accordion>
								</Card.Content>
							)}

							<Card.Content extra>
								<Grid>
									<Grid.Column width={8}>
										<Grid.Row>
											<Icon name="globe" />
											<span>{dish.cuisine.name}</span>
										</Grid.Row>
										<Grid.Row>
											<Icon name="food" />
											<span>{dish.category.name}</span>
										</Grid.Row>
									</Grid.Column>
									<Grid.Column width={8}>
										<Grid.Row>
											<Icon name="usd" />
											<span>{dish.price} грн</span>
										</Grid.Row>
										<Grid.Row>
											<Icon name="law" />
											<span>{dish.weight} г</span>
										</Grid.Row>
									</Grid.Column>
								</Grid>
							</Card.Content>

							<Card.Content extra>
								<Button onClick={() => handleDish(dish.id)} color="teal" fluid>
									Додати у кошик
								</Button>
							</Card.Content>
						</Card>
					) : null
				)}
			</Card.Group>
		</>
	);
};

const mapStateToProps = (state) => ({
	search: state.search.value,
	orderDishes: state.order.dishes,
	orderQuantity: state.order.quantity,
	filterCategoriesChecked: state.filterCategories.checked,
	filterCuisinesChecked: state.filterCuisines.checked,
});

export default connect(mapStateToProps)(DishesList);
