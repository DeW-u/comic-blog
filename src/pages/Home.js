import React from "react";
import { useGetAllPostsQuery } from "../services/appApi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import ArticlePreview from "../components/ArticlePreview";

function Home() {
	const { data: articles, isLoading, isError } = useGetAllPostsQuery();

	if (isError) {
		return (
			<div>
				<h1
					style={{
						marginTop: "5%",
						color: "#b2332b",
						WebkitTextStroke: "1.5px black",
					}}
					className="text-center"
				>
					Wystąpił nieznany błąd :&#40;
				</h1>

				<Col
					className="notfound__bg--container"
					style={{ marginTop: "50px" }}
				></Col>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="d-flex justify-content-center py-5">
				<Spinner animation="border" style={{ color: " #ffcd39" }} />
			</div>
		);
	}

	return (
		<Container>
			<div className="banner">
				<h1
					style={{
						fontWeight: "700",
						marginTop: "40px",
						color: "#ffcd39",
						WebkitTextStroke: "0.5px black",
					}}
				>
					Witamy na Comics Blog!
				</h1>
			</div>

			<Row>
				<Col
					md={12}
					className="blog-main d-flex pb-4 flex-wrap gap-4"
					style={{ marginBottom: "30px", marginTop: "30px" }}
				>
					{articles.slice(0).reverse().map((article, index) => (
						<ArticlePreview article={article} key={index} />
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default Home;
