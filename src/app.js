try {
	require("dotenv").config({ path: __dirname + "/../config/.env" });
} catch (err) {
	console.error("Error loading .env file:", err);
}

const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" }); // Replace with your ElasticSearch endpoint

const app = express();
const port = process.env.PORT || 2000;
const path = require("path");

app.set("views", path.join(__dirname, "views"));

// Set template engine
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route prefix - this points to all my routes
app.use("", require("./routes/routes"));

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});
