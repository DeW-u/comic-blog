import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./NotFound.css";

function NotFound() {
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
				Error 404:
			</h1>
			<h1
				style={{
                    marginTop: "5%",
					color: "#b2332b",
					WebkitTextStroke: "1.5px black",
				}}
				className="text-center"
			>
				Page Not Found :&#40;
			</h1>
			
			<Col
				className="notfound__bg--container"
				style={{ marginTop: "50px" }}
			></Col>
		</div>
	);
}

export default NotFound;
