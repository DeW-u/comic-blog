import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
// import axios from "axios";
import { useSignupUserMutation } from "../services/appApi";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [signupUser, { isLoading, data }] = useSignupUserMutation();
	function handleSignup(e) {
		e.preventDefault();
		signupUser({ email, password }).then(({ error})=>{
			if(!error) {
				navigate("/");
			} else {
				alert("Konto z tym adresem email już istnieje!\n\n(Jeśli uważasz inaczej sprawdź poprawność podanego adresu email)")
			}
		})
	}

	return (
		<Container>
			<Row style={{ marginTop: "40px" }}>
				<Col md={5} className="align-items-center ">
					<Form onSubmit={handleSignup}>
						<h1
							style={{
								color: "#ffcd39",
								WebkitTextStroke: "0.5px black",
							}}
						>
							Rejestracja
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

						<Button variant="warning" type="submit" disabled={isLoading}>
							Zarejestruj się
						</Button>
						<div className="py-4">
							<p style={{ color: "#fbe45c", fontWeight: "300" }}>
								Posiadasz już konto?{" "}
								<Link
									to="/login"
									style={{
										color: "#fbe45c",
										fontWeight: "800",
									}}
								>
									Zaloguj się
								</Link>
							</p>
						</div>
					</Form>
				</Col>
				<Col md={7} className="signup__bg--container"></Col>
			</Row>
		</Container>
	);
}

export default Signup;
