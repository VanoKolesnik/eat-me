import React from "react";

import { Icon } from "semantic-ui-react";

const Loading = ({ size = "large", ...args }) => {
	return <Icon loading size={size} name="sync alternate" {...args} />;
};

export default Loading;
