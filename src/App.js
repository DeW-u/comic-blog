import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import NewArticle from "./pages/NewArticle";
import EditArticle from "./pages/EditArticle";
import MyArticles from "./pages/MyArticles";
import SingleArticlePage from "./pages/SingleArticlePage";
import NotFound from "./pages/NotFound";

function App() {
	const { user } = useSelector((state) => state.user);

	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				{!user && (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</>
				)}
				{user && (
					<>
						<Route path="/new-post" element={<NewArticle />} />
						<Route
							path="/posts/:id/edit"
							element={<EditArticle />}
						/>
						<Route path="/posts/me" element={<MyArticles />} />
					</>
				)}
				<Route path="/posts/:id" element={<SingleArticlePage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
