const router = require("express").Router();
const BlogPost = require("../models/BlogPost");
const authUser = require("../middleware/auth");

router.post("/", authUser, async (req, res) => {
	const { title, content, image } = req.body;
	try {
		const article = await BlogPost.create({
			title,
			content,
			image,
			creator: req.user._id,
		});
		req.user.articles.push(article._id);
		await req.user.save();
		res.json(article);
	} catch (e) {
		res.status(400).json(e.message);
	}
});

router.get("/me", authUser, async (req, res) => {
	try {
		const user = req.user;
		user.populate("articles").then(({ articles }) => {
			res.json(articles);
		});
	} catch (e) {
		res.status(404).json(e);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const article = await BlogPost.findById(id);
		article.populate("creator").then((result) => {
			res.json(result);
		});
	} catch (e) {
		res.status(400).json("Not found");
	}
});

router.delete("/:id", authUser, async (req, res) => {
	const { id } = req.params;
	try {
		const article = await BlogPost.findById(id);
		if (article.creator.toString() === req.user._id.toString()) {
			await article.remove();
			res.status(200).json("Removed succesfully");
		} else {
			res.status(401).json("You don't have the right permissions");
		}
	} catch (e) {
		res.status(400).json(e);
	}
});

router.patch("/:id", authUser, async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	try {
		const article = await BlogPost.findByIdAndUpdate(id, {
			title,
			content,
		});
		res.status(200).send();
	} catch (e) {
		res.status(400).send();
	}
});

router.get("/", async (req, res) => {
	try {
		const posts = await BlogPost.find();
		res.json(posts);
	} catch (e) {
		res.status(404).json(e.message);
	}
});

module.exports = router;
