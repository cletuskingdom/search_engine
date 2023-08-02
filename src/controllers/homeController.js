const index = (req, res) => {
	res.render("./../views/welcome", {
		title:
			"Create and share personalized Avater for your favorite brand, events or campaigns - " +
			process.env.APP_NAME,
	});
};

// Export the controller functions
module.exports = {
	index,
};
