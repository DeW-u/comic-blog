import React from "react";
import { useSelector } from "react-redux";
import {
	Nav,
	NavDropdown,
	Navbar,
	Container,
	Dropdown,
	Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import gauntlet from "../images/gauntlet.png";
import { useLogoutUserMutation } from "../services/appApi";

function Navigation() {
	const { user } = useSelector((state) => state.user);
	const [logoutUser, { isLoading }] = useLogoutUserMutation();
	function handleLogout() {
		logoutUser().then(({ error }) => {
			if (!error) {
				console.log("User logged out!");
			} else {
				console.log("wrong!");
			}
		});
	}
	return (
		<Navbar bg="primary" variant="dark" expand="lg">
			<Container>
				<LinkContainer
					to="/"
					style={{
						fontWeight: "700",
						fontSize: "25px",
						color: "#ffcd39",
						WebkitTextStroke: "0.5px black",
					}}
				>
					<Navbar.Brand href="#home">
						<img
							src={gauntlet}
							width="30"
							height="35"
							className="d-inline-block align-top"
							alt="Comics Blog Logo"
						/>{" "}
						Comics Blog
					</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<LinkContainer to="/" style={{ margin: "10px" }}>
							<Nav.Link className="btn btn-warning text-dark">
								Strona główna
							</Nav.Link>
						</LinkContainer>
						{!user && (
							<LinkContainer
								to="/login"
								style={{ margin: "10px" }}
							>
								<Nav.Link className="btn btn-warning text-dark">
									Zaloguj się
								</Nav.Link>
							</LinkContainer>
						)}

						{user && (
							<NavDropdown
								title={user.email}
								id="basic-nav-dropdown"
								style={{ textAlign: "center", margin: "10px" }}
								menuVariant="dark"
							>
								<LinkContainer
									to="/new-post"
									style={{
										textAlign: "center",
										color: " #ffcd39",
									}}
								>
									<NavDropdown.Item>
										Stwórz artykuł
									</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer
									to="/posts/me"
									style={{
										textAlign: "center",
										color: " #ffcd39",
									}}
								>
									<NavDropdown.Item>
										Moje artykuły
									</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Divider
									style={{ backgroundColor: "#ffcd39" }}
								/>
								<NavDropdown.Item
									style={{ textAlign: "center" }}
								>
									<Button
										onClick={handleLogout}
										variant="outline-warning"
									>
										Wyloguj się
									</Button>
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
