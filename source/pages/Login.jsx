import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import md5 from "md5";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { setAccountId } from "../actions/accountIdActions";

const Login = ({ dispatch, accounts, accountsLoading, accountsHasErrors }) => {
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		dispatch(fetchAccounts());
	}, [dispatch]);

	const isValid = (loginData) => {
		let valid = false;

		accounts.map((accountData) => {
			if (accountData.username === loginData.username) {
				if (accountData.password === md5(loginData.password)) {
					valid = true;
					dispatch(setAccountId(accountData.id));
				}
			}
		});

		return valid;
	};

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setLoginData({ ...loginData, [name]: value });
	};

	const handleSubmit = () => {
		if (isValid(loginData)) {
			toast({
				type: "success",
				icon: "checkmark",
				title: "Готово",
				description: "Ви успішно увійшли",
				animation: "fly left",
				time: 10000,
			});
			window.location = "/";
		} else {
			toast({
				type: "warning",
				icon: "warning",
				title: "Помилка",
				description: "Такого користувача не знайдено",
				animation: "fly left",
				time: 2000,
			});
		}
	};

	return (
		<>
			<Header />

			<Grid centered>
				<Grid.Column mobile={16} tablet={10} computer={6}>
					<Segment>
						<Form loading={accountsLoading}>
							<Form.Field>
								<label htmlFor="username">Логін</label>
								<input
									type="text"
									id="username"
									placeholder="Логін"
									name="username"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="password">Пароль</label>
								<input
									type="password"
									id="password"
									placeholder="Пароль"
									name="password"
									onChange={handleInput}
								/>
							</Form.Field>
							<Button type="submit" onClick={handleSubmit} fluid color="teal">
								Увійти
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
			<SemanticToastContainer position="bottom-right" />
		</>
	);
};

const mapStateToProps = (state) => ({
	accounts: state.accounts.accounts,
	accountsLoading: state.accounts.loading,
	accountsHasErrors: state.accounts.hasErrors,
});

export default connect(mapStateToProps)(Login);
