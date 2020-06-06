const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 2020;
const routes = [
	{
		url: "/",
		template: "establishments",
	},
	{
		url: "/establishment",
		template: "establishment",
	},
	{
		url: "/login",
		template: "login",
	},
	{
		url: "/registration",
		template: "registration",
	},
	{
		url: "/profile",
		template: "profile",
	},
	{
		url: "/order",
		template: "order",
	},
	{
		url: "/orders",
		template: "orders",
	},
	{
		url: "/order-print",
		template: "order-print",
	},
	{
		url: "*",
		template: "establishments",
	},
];

app.use(express.static(path.join(__dirname, "./build")));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"POST, GET, PATCH, DELETE, OPTIONS"
	);
	next();
});

app.listen(port, () => console.log(`App listening on port: ${port}.`));

app.post("/send-order-email", (req, res) => {
	const orderData = req.body.orderData;

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		auth: {
			user: "eat.me.feedback@gmail.com",
			pass: "rLbtCwqW664BBtJY",
		},
	});

	const mailOptions = {
		from: "eat.me.feedback@gmail.com",
		to: req.body.mail,
		subject: "Eat Me",
		html: `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="https://www.w3.org/1999/xhtml">
			<head>
				<title>Eat Me</title>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0 " />
				<style>
				body {
					font-size: 14px;
					color: #333;
				}
				.table {
					margin: auto;
				}
				</style>
			</head>

			<body>
				<table align="center" width="600" class="table">
				<thead>
					<tr>
					<th>
						<a href="https://eat--me.herokuapp.com/" class="table__title"
						><h1>Eat Me</h1></a
						>
					</th>
					</tr>
				</thead>

				<tbody>
					<tr>
					<td><h2>Чек на замовлення № ${orderData.id}</h2></td>
					</tr>

					<tr>
					<td>Ім'я: ${orderData.name}</td>
					</tr>

					<tr>
					<td>Прізвище: ${orderData.surname}</td>
					</tr>

					<tr>
					<td>Телефон: ${orderData.customerPhone}</td>
					</tr>

					<tr>
					<td>
						Спосіб оплати: ${
							orderData.paymentMethod === "cash"
								? "Оплата готівкова курєру"
								: orderData.paymentMethod === "cashless"
								? "Оплата безготівкова кур'єру"
								: "Оплата онлайн"
						}
					</td>
					</tr>

					${
						orderData.orderDetail
							? `<tr>
											<td>
											Коментар: ${orderData.orderDetail}
											</td>
										</tr>`
							: null
					}

					<tr>
					<th>Зміст</th>
					</tr>
					<tr>
					${JSON.parse(orderData.orderListTextField).map(
						(orderListItem) =>
							`<td
										style="
						display: 'flex';
						flex-direction: 'row';
						justify-content: 'space-between';
						"
									>
										<span>${orderListItem.name}</span>
										<span>Кіл-ть: ${orderListItem.quantity}</span>
									</td>`
					)}
					</tr>

					<tr>
					<td>Кіл-ть страв: ${orderData.totalQuantity}</td>
					</tr>

					<tr>
					<td>Сума: ${orderData.totalPrice}</td>
					</tr>

					<tr>
					<td>${orderData.paid ? "Оплачено" : "Не оплачено"}</td>
					<td>${orderData.delivered ? "Доставлено" : "Не доставлено"}</td>
					</tr>
				</tbody>
				</table>
			</body>
			</html>
			`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.sendStatus(505);
		} else {
			res.sendStatus(200);
		}
	});
});

routes.forEach((route) => {
	app.get(route.url, (req, res) => {
		res.sendFile(path.join(__dirname, `./build/${route.template}.html`));
	});
});
