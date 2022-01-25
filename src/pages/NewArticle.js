import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw, EditorBlock } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCreatePostMutation } from "../services/appApi";
import batman from "../images/batman.jpg";
import "./NewArticle.css";

function NewArticle() {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const [uploadingimg, setUploadingimg] = useState(false);
	const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const navigate = useNavigate();

	function handlePublish(e) {
		e.preventDefault();
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		const content = draftToHtml(rawContentState);

		if (!title || !image || !content) {
			return alert("Tytuł, zdjęcie i tekst są wymagane");
		}

		createPost({ title, content, image: url }).then(({ error }) => {
			if (!error) {
				// alert("Post created");
			} else {
				console.log(error);
			}
		});
	}

	function handleEditorChange(state) {
		setEditorState(state);
	}

	function uploadImage(e) {
		e.preventDefault();
		if (!image) return;
		setUrl("");
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "ntcjjhha");
		setUploadingimg(true);
		fetch("https://api.cloudinary.com/v1_1/dlbzypbv8/image/upload", {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUploadingimg(false);
				setUrl(data.url);
			})
			.catch((err) => {
				setUploadingimg(false);
				console.log(err);
			});
	}

	function handleImageValidation(e) {
		const file = e.target.files[0];
		if (file.size > 1048576) {
			setImage(null);
			return alert("Obraz nie może być większy niż 1MB");
		} else {
			setImage(file);
		}
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
					Tworzenie artykułu...
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
					Utworzono nowy artykuł!
				</h1>
			</div>
		);
	}

	return (
		<Container>
			<Row style={{ marginTop: "40px" }}>
				<Col md={7}>
					<Form onSubmit={handlePublish}>
						<h1
							style={{
								color: "#ffcd39",
								WebkitTextStroke: "0.5px black",
							}}
						>
							Nowy artykuł
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
						<div>
							{!url && (
								<p
									className="alert alert-warning"
									style={{ marginTop: "15px" }}
								>
									Pamiętaj żeby dodać zdjęcie przed publikacją
									artykułu
								</p>
							)}
						</div>
						<div style={{ marginTop: "10px" }}>
							<input
								type="file"
								onChange={handleImageValidation}
								accept="image/png, image/jpeg"
								style={{ width: "60%" }}
							/>
							<Button
								variant="warning"
								onClick={uploadImage}
								disabled={uploadingimg || !image}
								style={{ float: "right" }}
							>
								Dodaj zdjęcie
							</Button>
							<Button
								variant="warning"
								type="submit"
								style={{
									width: "100%",
									marginTop: "10px",
									marginBottom: "40px",
								}}
								disabled={uploadingimg || !url}
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
					{uploadingimg && (
						<div className="text-center">
							<Spinner animation="border" role="status" style={{color: " #ffcd39"}}/>
							<br />
							<p className="py-2">Ładowanie zdjęcia</p>
						</div>
					)}
					<div>
						{!url && !uploadingimg && (
							<img
								src={batman}
								alt="Batman"
								style={{
									width: "100%",
									border: "2px solid #ffcd39",
									borderRadius: "4px",
									minHeight: "50vh",
									maxHeight: "60vh",
									marginBottom: "40px",
								}}
							/>
						)}
					</div>
					{url && (
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
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default NewArticle;
