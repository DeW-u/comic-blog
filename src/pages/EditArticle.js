import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertToRaw, EditorBlock } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useUpdatePostMutation } from "../services/appApi";
import batman from "../images/batman.jpg";
import "./NewArticle.css";
import { useSelector } from "react-redux";
import { ContentState, convertFromHTML } from "draft-js";

function EditArticle() {
	const { id } = useParams();
	const posts = useSelector((state) => state.posts);
	const postToEdit = posts.find((post) => post._id == id);
	const [updateArticle, { isLoading, isSuccess }] = useUpdatePostMutation();

	const [title, setTitle] = useState(postToEdit.title);
	const [url] = useState(postToEdit.image);

	const contentDataState = ContentState.createFromBlockArray(
		convertFromHTML(postToEdit.content)
	);
	const editorDataState = EditorState.createWithContent(contentDataState);
	const [editorState, setEditorState] = useState(editorDataState);
	const navigate = useNavigate();

	function handleUpdate(e) {
		e.preventDefault();
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		const content = draftToHtml(rawContentState);

		if (!title || !content) {
			return alert(
				"Upewnij się, że tytuł i zawartość artykułu nie są puste!"
			);
		}
		updateArticle({ id, title, content });
	}

	function handleEditorChange(state) {
		setEditorState(state);
	}

	if (isLoading) {
		return (
			<div className="py-4">
				<h1
					className="text-center"
					style={{
						color: "#ffcd39",
						WebkitTextStroke: "0.5px black",
					}}
				>
					Aktualizowanie twojego artykułu...
				</h1>
			</div>
		);
	}

	if (isSuccess) {
		setTimeout(() => {
			navigate("/");
		}, 3000);
		return (
			<div className="py-4">
				<h1
					className="text-center"
					style={{
						color: "#ffcd39",
						WebkitTextStroke: "0.5px black",
					}}
				>
					Zaaktualizowano artykuł!
				</h1>
			</div>
		);
	}

	return (
		<Container>
			<Row style={{ marginTop: "40px" }}>
				<Col md={7}>
					<Form onSubmit={handleUpdate}>
						<h1
							style={{
								color: "#ffcd39",
								WebkitTextStroke: "0.5px black",
							}}
						>
							Edytuj artykuł
						</h1>
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								placeholder="Twój tytuł"
								style={{
									backgroundColor: "#262626",
									color: "#ffcd39",
									border: "2px solid #ffcd39",
									borderRadius: "4px",
									marginTop: "40px",
								}}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Editor
							stripPastedStyles={true}
							editorState={editorState}
							onEditorStateChange={handleEditorChange}
							toolbarStyle={{
								border: "2px solid gray",
								borderRadius: "4px",
								color: "black",
							}}
							wrapperClassName="wrapper mb-4"
							editorClassName="editor"
						/>
						<Form.Select
							style={{
								backgroundColor: "#262626",
								color: "#ffcd39",
								border: "2px solid #ffcd39",
								borderRadius: "4px",
							}}
						>
							<option>Wybierz kategorię:</option>
							<option value="Marvel">Marvel</option>
							<option value="DC">DC</option>
							<option value="others">Inne</option>
						</Form.Select>
						<div style={{ marginTop: "10px" }}>
							<Button
								variant="warning"
								type="submit"
								style={{
									width: "100%",
									marginTop: "10px",
									marginBottom: "40px",
								}}
							>
								Opublikuj
							</Button>
						</div>
					</Form>
				</Col>
				<Col
					md={5}
					className="d-flex justify-content-center align-items-center"
				>
					<img
						src={url}
						alt="img"
						style={{
							width: "100%",
							border: "2px solid #ffcd39",
							borderRadius: "4px",
							minHeight: "50vh",
							maxHeight: "60vh",
							marginBottom: "40px",
						}}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default EditArticle;
