import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Card, List, Button } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { getAccountId } from "../actions/accountIdActions";

import { ORDER_PRINT } from "../utilities/constants";

const OrderPrint = ({ dispatch, account, accountId }) => {
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

	useEffect(() => {
		dispatch(getAccountId());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAccounts(accountId));
	}, [accountId]);

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

							<List.Item
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
								}}
							>
								<Button
									onClick={() => {
										window.print();
									}}
									fluid
									color="teal"
									style={{ marginBottom: 20 }}
								>
									Друк
								</Button>
								<Button
									onClick={() => {
										axios
											.post("http://localhost:2020/send-order-email", {
												id: account.id,
												mail: account.email,
												orderData: order,
											})
											.then((res) => {
												toast({
													type: "success",
													icon: "checkmark",
													title: "Відправлено",
													description: "Перевірте пошту",
													animation: "fly left",
													time: 5000,
												});
											})
											.catch((err) => {
												toast({
													type: "warning",
													icon: "warning",
													title: "Помилка",
													description: "Помилка на сервері. Повторіть пізніше",
													animation: "fly left",
													time: 5000,
												});
											});
									}}
									fluid
									color="teal"
								>
									Відправити на пошту
								</Button>
							</List.Item>
						</List>
					</Card.Content>
				</Card>
			</Card.Group>
			<div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
				<SemanticToastContainer position="bottom-right" />
			</div>
		</>
	);
};

export default connect((state) => ({
	account: state.accounts.accounts,
	accountId: state.accountId.id,
}))(OrderPrint);
