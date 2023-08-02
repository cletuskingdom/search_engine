require("dotenv").config();
const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" }); // Replace with your ElasticSearch endpoint

const app = express();
const port = process.env.PORT || 2000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/search", async (req, res) => {
	try {
		const { q } = req.query;
		console.log("Search query:", q);

		const searchResult = await client.search({
			index: "search",
			body: {
				query: {
					match: {
						content: q,
					},
				},
			},
		});
		console.log("ElasticSearch result:", searchResult);

		res.json(searchResult.body.hits.hits.map((hit) => hit._source));
	} catch (err) {
		console.error("Search error:", err);
		res.status(500).json({
			error: "An error occurred while searching.",
		});
	}
});

// Set template engine
app.set("view engine", "ejs");

// Route prefix - this points to all my routes
app.use("", require("./routes/routes"));

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});
