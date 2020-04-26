import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import md5 from "md5";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { postAccount } from "../actions/fetchedActions/postAccountActions";

const Registration = ({
	dispatch,
	accounts,
	accountsLoading,
	accountsHasErrors,
	accountResponse,
	accountLoading,
	accountHasErrors,
}) => {
	const [registrationData, setRegistrationData] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		username: "",
		password: "",
	});

	useEffect(() => {
		dispatch(fetchAccounts());
	}, [dispatch]);

	const isValid = (registrationData) => {
		let valid = true;

		accounts.map((accountData) => {
			if (accountData.username === registrationData.username) {
				valid = false;
			}
		});
		if (registrationData.username === "") valid = false;
		if (registrationData.password === "") valid = false;

		return valid;
	};

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setRegistrationData({ ...registrationData, [name]: value });
	};

	const handleSubmit = () => {
		if (isValid(registrationData)) {
			dispatch(
				postAccount({ ...registrationData, password: md5(registrationData.password) })
			);
			toast({
				type: "success",
				icon: "checkmark",
				title: "Готово",
				description: "Реєстація пройшла успішно",
				animation: "fly left",
				time: 10000,
			});
			setTimeout(() => (window.location = "/login"), 2000);
		} else {
			toast({
				type: "warning",
				icon: "warning",
				title: "Помилка",
				description: "Перевірте правильність заповнення полів",
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
						<Form>
							<Form.Field>
								<label htmlFor="first_name">Ім'я</label>
								<input
									type="text"
									id="first_name"
									placeholder="Ім'я"
									name="first_name"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="last_name">Прізвище</label>
								<input
									type="text"
									id="last_name"
									placeholder="Прізвище"
									name="last_name"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="phone">Телефон</label>
								<input
									type="tel"
									id="phone"
									placeholder="Телефон"
									name="phone"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="email">Пошта</label>
								<input
									type="email"
									id="email"
									placeholder="Пошта"
									name="email"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field required>
								<label htmlFor="username">Логін</label>
								<input
									type="text"
									id="username"
									placeholder="Логін"
									name="username"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field required>
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
								Зареєструватися
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

	accountResponse: state.postAccount.response,
	accountLoading: state.postAccount.loading,
	accountHasErrors: state.postAccount.hasErrors,
});

export default connect(mapStateToProps)(Registration);
