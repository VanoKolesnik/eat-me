import React, { useState, useEffect } from "react";

import { Card, List, Button } from "semantic-ui-react";

import Header from "../components/Header";

import { ORDER_PRINT } from "../utilities/constants";

const OrderPrint = () => {
	const [order, setOrder] = useState({
		customerPhone: "",
		delivered: false,
		get_cost: 0,
		id: 0,
		name: "",
		orderDetail: "",
		orderListTextField: "[]",
		orderTime: "",
		paid: false,
		paymentMethod: "",
		surname: "",
		totalPrice: 0,
		totalQuantity: 0,
		user_id: 0,
	});

	useEffect(() => {
		setOrder(JSON.parse(localStorage.getItem(ORDER_PRINT)));
	}, []);

	return (
		<>
			<Header />
			<Card.Group centered style={{ height: "100vh" }}>
				<Card style={{ margin: "auto" }}>
					<Card.Header style={{ padding: 15 }}>
						Номер замовлення: {order.id}
					</Card.Header>

					<Card.Content>
						<List>
							<List.Item>Ім'я: {order.name}</List.Item>
							<List.Item>Прізвище: {order.surname}</List.Item>
							<List.Item>Телефон: {order.customerPhone}</List.Item>
							<List.Item>
								Спосіб оплати:{" "}
								{order.paymentMethod === "cash"
									? "Оплата готівкова кур'єру"
									: order.paymentMethod === "cashless"
									? "Оплата безготівкова кур'єру"
									: "Оплата онлайн"}
							</List.Item>
							{order.orderDetail ? (
								<List.Item>Коментар: {order.orderDetail}</List.Item>
							) : null}
							<List.Item>
								Зміст:
								<List.List>
									{JSON.parse(order.orderListTextField).map((orderListItem) => (
										<List.Item
											key={orderListItem.id}
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<span>{orderListItem.name}</span>
											<span>Кіл-ть: {orderListItem.quantity}</span>
										</List.Item>
									))}
								</List.List>
							</List.Item>
							<List.Item>Кіл-ть страв: {order.totalQuantity}</List.Item>
							<List.Item>Сума: {order.totalPrice}</List.Item>
							<List.Item
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<span>{order.paid ? "Оплачено" : "Не оплачено"}</span>
								<span>{order.delivered ? "Доставлено" : "Не доставлено"}</span>
							</List.Item>

							<List.Item>
								<Button
									onClick={() => {
										window.print();
									}}
									fluid
									color="teal"
								>
									Друк
								</Button>
							</List.Item>
						</List>
					</Card.Content>
				</Card>
			</Card.Group>
		</>
	);
};

export default OrderPrint;
