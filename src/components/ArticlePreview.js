import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import morales from "../images/morales.jpg";
import { useDeletePostMutation } from "../services/appApi";

function ArticlePreview({ article, currentUserPost }) {
	const { title, content, image, _id } = article;
	const [deleteArticle, { isLoading }] = useDeletePostMutation();
	function handleDelete() {
		deleteArticle(_id);
	}

	return (
		<Card
			style={{
				width: "18rem",
				backgroundColor: "#262626",
				color: "#ffcd39",
				border: "2px solid #ffcd39",
				borderTopLeftRadius: "10px",
				borderTopRightRadius: "10px",
				borderBottomLeftRadius: "0px",
				borderBottomRightRadius: "0px",
				position: "relative",
			}}
		>
			<Card.Img
				variant="top"
				src={image || morales}
				style={{
					height: "200px",
					objectFit: "cover",
					borderTopRightRadius: "10px",
					borderTopLeftRadius: "10px",
				}}
			/>
			<Card.Title style={{ padding: "10px" }}>{title}</Card.Title>
			<div
				dangerouslySetInnerHTML={{
					__html: content?.substring(0, 14) + "...",
				}}
				style={{ padding: "10px" }}
			/>

			{currentUserPost && (
				<ButtonGroup>
					<Button
						className="btn btn-danger rounded-0"
						onClick={handleDelete}
					>
						{isLoading ? "Usuwanie" : "Usuń"}
					</Button>
					<LinkContainer to={`/posts/${_id}/edit`}>
						<Button className="btn btn-secondary rounded-0">
							Edytuj
						</Button>
					</LinkContainer>
				</ButtonGroup>
			)}
			<LinkContainer to={`/posts/${_id}`}>
				<Button className="btn btn-warning bottom-0 mt-auto rounded-0">
					Więcej
				</Button>
			</LinkContainer>
		</Card>
	);
}

export default ArticlePreview;
