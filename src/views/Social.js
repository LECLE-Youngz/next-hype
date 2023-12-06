import { useEffect, useState } from "react";
import { getPosts, getPostsByTag, getTags } from "../helpers/social";
import PostPreview from "../components/PostPreview";
import { Link, useNavigate } from "react-router-dom";

export default function Social({ chosenTag, updatePosts }) {
	const [search, setSearch] = useState("");
	const [posts, setPosts] = useState(null);
	const [tags, setTags] = useState(null);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const tags = await getTags();
			setTags(tags);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setUpdating(true);
			if (chosenTag) {
				const newPosts = await getPostsByTag(chosenTag);
				setPosts([...newPosts]);
			} else {
				const newPosts = await getPosts();
				setPosts([...newPosts]);
				updatePosts(newPosts, tags);
			}
			setUpdating(false);
		};
		fetchData();
	}, [chosenTag, tags]); // Include tags as a dependency

	const navigate = useNavigate();

	if (tags === null || posts === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# Join the <span className="twinkle-text">community</span>{" "}
				</h1>
				<button
					className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
					onClick={() => navigate("/social/create")}
				>
					Create post
				</button>
			</div>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight">
					## choose your tags
				</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">
					/
				</p>
				<p className="truncate border-b w-3/4 border-gray-900 text-2xl font-extralight text-right flex">
					<input
						className="text-right appearance-none rounded-full flex-1 outline-none text-gray-600 w-full pr-1"
						placeholder="## find posts"
						type="text"
						required=""
						onChange={(e) => setSearch(e.target.value)}
					/>
				</p>
			</div>
			<div className="grid grid-cols-4 mx-10 gap-10">
				<div className="flex flex-wrap gap-3 h-min">
					{tags.map((tag) => (
						<Link
							className={`${
								chosenTag === tag.tag
									? "bg-gray-900 text-gray-100"
									: "text-gray-900 hover:text-gray-100 hover:bg-gray-900 "
							} group cursor-pointer border border-gray-900 py-2 px-4 h-min`}
							to={`/social/${chosenTag === tag.tag ? "" : "tag/" + tag.tag}`}
						>
							{chosenTag === tag.tag ? (
								<div className="btn-group relative w-full">
									<span className="group-hover:invisible visible">
										{tag.tag} &nbsp;|&nbsp; {tag.count}
									</span>
									<span className="group-hover:block hidden absolute top-0 w-full">
										{tag.tag} &nbsp;|&nbsp; x
									</span>
								</div>
							) : (
								<span className="">
									{tag.tag} &nbsp;|&nbsp; {tag.count}
								</span>
							)}
						</Link>
					))}
				</div>
				<div className="col-span-3 flex flex-wrap gap-y-6 justify-evenly">
					{!updating && posts.map((post) => <PostPreview postId={post} />)}
				</div>
			</div>
		</div>
	);
}
