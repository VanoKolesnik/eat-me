import React from "react";

import { Button } from "semantic-ui-react";

const Reload = ({ reload, icon = "redo alternate", ...args }) => {
	return <Button icon={icon} circular onClick={reload} {...args} />;
};

export default Reload;
