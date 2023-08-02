const view_path = "./../views/";

// Static data for dummy search results
const searchResults = [
	{ title: "Search Result 1", url: "https://www.example.com/result1" },
	{ title: "Search Result 2", url: "https://www.example.com/result2" },
	{ title: "Search Result 3", url: "https://www.example.com/result3" },
	{ title: "Search Result 4", url: "https://www.example.com/result4" },
	{ title: "Search Result 5", url: "https://www.example.com/result5" },
	{ title: "Men in SWZ2", url: "https://www.example.com/result5" },
];

const index = (req, res) => {
	res.render(view_path + "welcome", {
		title: "Search",
	});
};

const redirect_back_home = (req, res) => {
	// Redirect back to the home page
	res.redirect("/");
};

const search = async (req, res) => {
	const query = req.body.query;
	const filteredResults = searchResults.filter((result) =>
		result.title.toLowerCase().includes(query.toLowerCase())
	);
	res.render(view_path + "search", { query, searchResults: filteredResults });
};

// Export the controller functions
module.exports = {
	index,
	search,
	redirect_back_home,
};
