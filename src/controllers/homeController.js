const axios = require("axios");
const view_path = "./../views/";

const index = (req, res) => {
	res.render(view_path + "welcome", {
		title: "Search",
	});
};

const redirect_back_home = (req, res) => {
	// Redirect back to the home page
	res.redirect("/");
};

const fetchSearchResults = async (query, page) => {
	try {
		// Replace "YOUR_GOOGLE_SEARCH_API_KEY" with your actual Google Search API key
		const apiKey = "AIzaSyBPYrUV0Mc-kkLlTNsVoJFgKZVL937ybpc";
		const searchEngineId = "e264df21021574b51";
		const resultsPerPage = 10;
		const startIndex = (page - 1) * resultsPerPage;
		const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(
			query
		)}&start=${startIndex}`;

		const response = await axios.get(apiUrl);
		return response.data;
	} catch (error) {
		console.error("Error fetching search results:", error.message);
		return null;
	}
};

const search = async (req, res) => {
	const query = req.body.query;
	try {
		const resultsPerPage = 10; // Set the number of search results to display per page
		let currentPage = req.query.page ? parseInt(req.query.page, 10) : 1;
		let searchResults = [];

		// Fetch and handle search results for each page
		while (true) {
			const pageResults = await fetchSearchResults(query, currentPage);
			if (
				!pageResults ||
				!pageResults.items ||
				pageResults.items.length === 0
			) {
				// No more results or error, stop fetching
				break;
			}

			// Extract relevant information from the API response and add to searchResults
			searchResults.push(
				...pageResults.items.map((item) => ({
					url: item.link,
					title: item.title,
					snippet: item.snippet,
				}))
			);

			// If there are more pages, increment currentPage and fetch the next page
			if (pageResults.queries.nextPage) {
				currentPage++;
			} else {
				break; // No more pages, stop fetching
			}
		}

		res.render(view_path + "search", {
			query,
			searchResults,
			currentPage,
			resultsPerPage,
		});
	} catch (error) {
		console.error("Error fetching search results:", error.message);
		res.render(view_path + "search", {
			query,
			searchResults: [],
			currentPage: 1,
			resultsPerPage: 10,
		});
	}
};

// Export the controller functions
module.exports = {
	index,
	search,
	redirect_back_home,
};
