const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require('./routes/postsRoutes');
require("./connection");

const port = 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

app.listen(port, () => {
	console.log("Server is running");
});
