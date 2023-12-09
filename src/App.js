import { useEffect, useState } from "react";
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	useLocation,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing from "./views/Landing";
import Generate from "./views/Generate";
import Discover from "./views/Discover";
import Profile from "./views/Profile";
import Wrapper from "./components/Wrapper";
import LeaderBoard from "./views/Leaderboard";
import Social from "./views/Social";
import { getUsers } from "./helpers/user";
import { getPosts, getTags } from "./helpers/social";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Collections from "./views/Collections";
import Events from "./views/Events";
import Space from "./components/Space";
import CreateEventFollow from "./components/CreateEventFollow";
import CreateEventSubscribe from "./components/CreateEventSubscribe";
import CreateEventPurchase from "./components/CreateEventPurchase";

function App() {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const users = await getUsers();
			setUsers(users);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const posts = await getPosts();
			const tags = await getTags();
			setPosts(posts);
			setTags(tags);
		};
		fetchData();
	}, []);

	const updatePosts = async (newPosts, newTags) => {
		setPosts(newPosts);
		if (newTags) {
			setTags(newTags);
		}
	};

	return (
		<GoogleOAuthProvider
			clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Wrapper children={<Landing />} />} />
					<Route
						path="/generate"
						element={<Wrapper children={<Generate />} />}
					/>
					<Route
						path="/discover"
						element={<Wrapper children={<Discover />} />}
					/>
					<Route
						path="/leaderboard"
						element={<Wrapper children={<LeaderBoard />} />}
					/>
					<Route
						path="/collections"
						element={<Wrapper children={<Collections />} />}
					/>
					<Route path="/events" element={<Wrapper children={<Events />} />} />
					<Route path="/profile" element={<Wrapper children={<Profile />} />} />
					{users.map((userId) => (
						<>
							<Route
								path={`/profile/${userId}`}
								element={<Wrapper children={<Profile userId={userId} />} />}
							/>
							<Route
								path={`/profile/${userId}/space`}
								element={
									<Wrapper children={<Space userId={userId} space={true} />} />
								}
							/>
						</>
					))}
					<Route
						path="/social"
						element={
							<Wrapper children={<Social updatePosts={updatePosts} />} />
						}
					/>
					{tags.map((tag) => (
						<Route
							path={`/social/tag/${tag.tag}`}
							element={
								<Wrapper
									children={
										<Social chosenTag={tag.tag} updatePosts={updatePosts} />
									}
								/>
							}
						/>
					))}
					{posts.map((postId) => (
						<Route
							path={`/social/${postId}`}
							element={<Wrapper children={<Post postId={postId} />} />}
						/>
					))}
					<Route
						path={`/social/create`}
						element={
							<Wrapper children={<CreatePost updatePosts={updatePosts} />} />
						}
					/>
					<Route path={`/event`} element={<Wrapper children={<Events />} />} />
					<Route
						path={`/event/follow`}
						element={<Wrapper children={<CreateEventFollow />} />}
					/>
					<Route
						path={`/event/subscribe`}
						element={<Wrapper children={<CreateEventSubscribe />} />}
					/>
					<Route
						path={`/event/purchase`}
						element={<Wrapper children={<CreateEventPurchase />} />}
					/>
					<Route path="/assets/*" />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;
