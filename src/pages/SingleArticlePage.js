import React from "react";
import { useGetOnePostQuery } from "../services/appApi";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import morales from "../images/morales.jpg";

function SingleArticlePage() {
	const { id } = useParams();
	const { isLoading, data: article, isError } = useGetOnePostQuery(id);

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
			<Row>
				<Col md={8} style={{ margin: "0 auto" }}>
					<img
						src={article.image}
						style={{
							width: "100%",
							maxHeight: "400px",
							objectFit: "cover",
						}}
						alt={morales}
					/>
					<h1
						style={{
							color: "#ffcd39",
							WebkitTextStroke: "0.5px black",
						}}
					>
						{article.title}
					</h1>
					<p
						style={{
							color: "#ffcd39",
							WebkitTextStroke: "0.5px black",
							fontWeight: "700",
						}}
					>
						Autor: {article.creator.email}
					</p>
					<div
						style={{
							color: "#ffcd39",
							fontWeight: "400",
							textShadow: "1px 1px black",
							marginBottom: "40px",
							wordBreak: "break-word"
						}}
						dangerouslySetInnerHTML={{ __html: article.content }}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default SingleArticlePage;
