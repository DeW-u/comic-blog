import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useLoginUserMutation } from "../services/appApi";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [loginUser, { isLoading, data, isSuccess }] = useLoginUserMutation();
	function handleLogin(e) {
		e.preventDefault();
		loginUser({ email, password }).then(({ error }) => {
			if (!error) {
				navigate("/");
			} else {
				alert("Niepoprawny email lub hasło!\n\n(Jeśli uważasz inaczej sprawdź poprawność adresu email)");
			}
		});
	}
	return (
		<Container>
			<Row style={{ marginTop: "40px" }}>
				<Col md={5} className="align-items-center ">
					<Form onSubmit={handleLogin}>
						<h1
							style={{
								color: "#ffcd39",
								WebkitTextStroke: "0.5px black",
							}}
						>
							Logowanie
						</h1>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label
								style={{ color: "#fbe45c", fontWeight: "600" }}
							>
								Email
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="Adres email"
								value={email}
								onChange={(ev) => setEmail(ev.target.value)}
								style={{
									backgroundColor: "#262626",
									color: "#ffcd39",
									border: "2px solid #ffcd39",
									borderRadius: "4px",
								}}
							/>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label
								style={{ color: "#fbe45c", fontWeight: "600" }}
							>
								Hasło
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Hasło"
								value={password}
								onChange={(ev) => setPassword(ev.target.value)}
								style={{
									backgroundColor: "#262626",
									color: "#ffcd39",
									border: "2px solid #ffcd39",
									borderRadius: "4px",
								}}
							/>
						</Form.Group>

						<Button
							variant="warning"
							type="submit"
							disabled={isLoading}
						>
							Zaloguj się
						</Button>
						<div className="py-4">
							<p style={{ color: "#fbe45c", fontWeight: "300" }}>
								Nie masz konta?{" "}
								<Link
									to="/signup"
									style={{
										color: "#fbe45c",
										fontWeight: "800",
									}}
								>
									Zarejestruj się
								</Link>
							</p>
						</div>
					</Form>
				</Col>
				<Col md={7} className="login__bg--container"></Col>
			</Row>
		</Container>
	);
}

export default Login;
