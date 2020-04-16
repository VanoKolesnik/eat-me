import React, { useState } from "react";
import { Responsive, Menu, Dropdown } from "semantic-ui-react";

const emojis = [
	"😉",
	"🧐",
	"👽",
	"🐇",
	"🐧",
	"🍕",
	"🍔",
	"🍟",
	"🌭",
	"🥐",
	"🥞",
	"🥗",
	"🥪",
	"🌮",
	"🥨",
	"🥟",
	"🍗",
	"🍣",
	"🍤",
	"🍲",
	"🥧",
	"🍩",
	"🍌",
	"🍉",
	"🍎",
	"🥕",
	"❤",
];

const selectEmoji = emojis[Math.floor(Math.random() * emojis.length)];

const MenuItems = ({ items, minWidth }) => {
	return items.map((item, key) => (
		<Responsive minWidth={minWidth} key={key}>
			<Menu.Item href={item.href}>{item.title}</Menu.Item>
		</Responsive>
	));
};
const DropdownItems = ({ items }) => {
	return items.map((item, key) => (
		<Dropdown.Item href={item.href} key={key}>
			{item.title}
		</Dropdown.Item>
	));
};

const Header = () => {
	const [logoEmoji] = useState(selectEmoji);
	const [menuItems] = useState([
		{ title: "Головна", href: "/" },
		{ title: "Заклади", href: "/establishments" },
	]);

	return (
		<Menu fixed="top" fluid borderless>
			<Menu.Item href="/" header>
				{logoEmoji} Eat Me
			</Menu.Item>
			<Menu.Menu position="right">
				<MenuItems items={menuItems} minWidth={530} />

				<Responsive maxWidth={530}>
					<Dropdown item icon="bars">
						<Dropdown.Menu>
							<DropdownItems items={menuItems} />
						</Dropdown.Menu>
					</Dropdown>
				</Responsive>
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
