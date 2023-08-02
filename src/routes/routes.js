const express = require("express");
const router = express.Router();
const homeController = require("./../controllers/homeController");

// Welcome route
router.get("/", homeController.index);

// router.get("/search", async (req, res) => {
// 	try {
// 		const { q } = req.query;
// 		console.log("Search query:", q);

// 		const searchResult = await client.search({
// 			index: "search",
// 			body: {
// 				query: {
// 					match: {
// 						content: q,
// 					},
// 				},
// 			},
// 		});
// 		console.log("ElasticSearch result:", searchResult);

// 		res.json(searchResult.body.hits.hits.map((hit) => hit._source));
// 	} catch (err) {
// 		console.error("Search error:", err);
// 		res.status(500).json({
// 			error: "An error occurred while searching.",
// 		});
// 	}
// });

module.exports = router;
